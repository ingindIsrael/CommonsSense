import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { S3 } from 'aws-sdk';
import { readAndDecryptPepperInfo } from './encrypted-pepper-storage';

interface PepperBackup {
  currentPepper: string;
  oldPepper: string;
  backupDate: string;
  backupId: string;
}

// Configure backup locations - use multiple for redundancy
const LOCAL_BACKUP_DIR = path.join(process.cwd(), 'secure-backups');
const BACKUP_ENCRYPTION_KEY = process.env.BACKUP_ENCRYPTION_KEY || '';
const AWS_BACKUP_BUCKET = process.env.AWS_BACKUP_BUCKET || '';
const BACKUP_RETENTION_COUNT = 5; // Keep this many recent backups

/**
 * Create encrypted backups of pepper values in multiple locations
 */
export async function backupPepperValues(): Promise<string> {
  try {
    // Ensure local backup directory exists
    if (!fs.existsSync(LOCAL_BACKUP_DIR)) {
      fs.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true, mode: 0o700 });
    }

    // Get current pepper values
    const pepperInfo = readAndDecryptPepperInfo();
    const currentPepper = pepperInfo.value;
    const oldPepper = process.env.OLD_PEPPER || '';

    // Create backup object
    const backupId = crypto.randomBytes(8).toString('hex');
    const backupData: PepperBackup = {
      currentPepper,
      oldPepper,
      backupDate: new Date().toISOString(),
      backupId
    };

    // Encrypt the backup
    const backupString = JSON.stringify(backupData);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm', 
      Buffer.from(BACKUP_ENCRYPTION_KEY, 'hex'), 
      iv
    );
    
    let encrypted = cipher.update(backupString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    const encryptedBackup = JSON.stringify({
      iv: iv.toString('hex'),
      authTag,
      data: encrypted,
      backupId,
      backupDate: backupData.backupDate
    });

    // Save local backup
    const localBackupPath = path.join(LOCAL_BACKUP_DIR, `pepper-backup-${backupId}.json`);
    fs.writeFileSync(localBackupPath, encryptedBackup, { mode: 0o600 });
    
    // Save to cloud storage (AWS S3)
    if (AWS_BACKUP_BUCKET) {
      const s3 = new S3();
      await s3.putObject({
        Bucket: AWS_BACKUP_BUCKET,
        Key: `pepper-backups/pepper-backup-${backupId}.json`,
        Body: encryptedBackup,
        ServerSideEncryption: 'AES256'
      }).promise();
    }

    // Cleanup old backups
    await cleanupOldBackups();

    console.log(`Pepper backup created successfully with ID: ${backupId}`);
    return backupId;
  } catch (error) {
    console.error('Failed to backup pepper values:', error);
    throw error;
  }
}

/**
 * Restore pepper values from a backup
 */
export async function restorePepperFromBackup(backupId?: string): Promise<void> {
  try {
    // Find the most recent backup if no ID provided
    let backupFile: string;
    
    if (backupId) {
      backupFile = path.join(LOCAL_BACKUP_DIR, `pepper-backup-${backupId}.json`);
      if (!fs.existsSync(backupFile)) {
        throw new Error(`Backup with ID ${backupId} not found`);
      }
    } else {
      // Get the most recent backup
      const files = fs.readdirSync(LOCAL_BACKUP_DIR)
        .filter(file => file.startsWith('pepper-backup-'))
        .map(file => ({
          file,
          path: path.join(LOCAL_BACKUP_DIR, file),
          stat: fs.statSync(path.join(LOCAL_BACKUP_DIR, file))
        }))
        .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());
      
      if (files.length === 0) {
        throw new Error('No pepper backups found');
      }
      
      backupFile = files[0].path;
    }
    
    // Read and decrypt the backup
    const encryptedData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(BACKUP_ENCRYPTION_KEY, 'hex'),
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    const backupData: PepperBackup = JSON.parse(decrypted);
    
    // Update environment variables
    process.env.PEPPER = backupData.currentPepper;
    process.env.OLD_PEPPER = backupData.oldPepper;
    
    // Update .env.local file
    let envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
    envContent = envContent.replace(/^PEPPER=.*$/m, `PEPPER='${backupData.currentPepper}'`);
    envContent = envContent.replace(/^OLD_PEPPER=.*$/m, `OLD_PEPPER='${backupData.oldPepper}'`);
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
    
    console.log(`Pepper values restored successfully from backup ID: ${backupData.backupId}`);
  } catch (error) {
    console.error('Failed to restore pepper values:', error);
    throw error;
  }
}

/**
 * Clean up old backups, keeping only the most recent ones
 */
async function cleanupOldBackups(): Promise<void> {
  try {
    // Clean up local backups
    const localFiles = fs.readdirSync(LOCAL_BACKUP_DIR)
      .filter(file => file.startsWith('pepper-backup-'))
      .map(file => ({
        file,
        path: path.join(LOCAL_BACKUP_DIR, file),
        stat: fs.statSync(path.join(LOCAL_BACKUP_DIR, file))
      }))
      .sort((a, b) => b.stat.mtime.getTime() - a.stat.mtime.getTime());
    
    // Keep only the most recent backups
    if (localFiles.length > BACKUP_RETENTION_COUNT) {
      for (let i = BACKUP_RETENTION_COUNT; i < localFiles.length; i++) {
        fs.unlinkSync(localFiles[i].path);
      }
    }
    
    // Clean up S3 backups if configured
    if (AWS_BACKUP_BUCKET) {
      const s3 = new S3();
      const response = await s3.listObjectsV2({
        Bucket: AWS_BACKUP_BUCKET,
        Prefix: 'pepper-backups/'
      }).promise();
      
      if (response.Contents && response.Contents.length > BACKUP_RETENTION_COUNT) {
        const objectsToDelete = response.Contents
          .sort((a, b) => (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0))
          .slice(BACKUP_RETENTION_COUNT)
          .map(obj => ({ Key: obj.Key || '' }))
          .filter(obj => obj.Key !== '');
        
        if (objectsToDelete.length > 0) {
          await s3.deleteObjects({
            Bucket: AWS_BACKUP_BUCKET,
            Delete: { Objects: objectsToDelete }
          }).promise();
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up old backups:', error);
  }
} 