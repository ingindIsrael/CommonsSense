import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { getPepperInfo, storePepperInfo } from '@/utils/encrypted-pepper-storage';
import { backupPepperValues } from '@/utils/pepper-backup';

const execAsync = promisify(exec);

interface PepperInfo {
  value: string;
  createdAt: string; // ISO date string
}

const PEPPER_FILE = path.join(process.cwd(), '.pepper-info.json');
const ROTATION_DAYS = 90;

/**
 * Check if the pepper needs rotation and rotate if necessary
 */
export async function checkAndRotatePepper() {
  try {
    // Load current pepper info
    let pepperInfo: PepperInfo;
    
    try {
      pepperInfo = getPepperInfo();
    } catch (error) {
      // Initialize with current environment pepper
      pepperInfo = {
        value: process.env.PEPPER || '',
        createdAt: new Date().toISOString()
      };
      
      // Save the initial info
      storePepperInfo(pepperInfo);
      return;
    }
    
    // Check if 90 days have passed
    const createdDate = new Date(pepperInfo.createdAt);
    const now = new Date();
    const daysDiff = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysDiff >= ROTATION_DAYS) {
      // Create a backup before rotation
      await backupPepperValues();
      
      // Generate new pepper
      const { stdout } = await execAsync('openssl rand -hex 32');
      const newPepper = stdout.trim();
      
      // Update environment variables
      process.env.OLD_PEPPER = process.env.PEPPER;
      process.env.PEPPER = newPepper;
      
      // Update .env.local file
      let envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
      envContent = envContent.replace(/^PEPPER=.*$/m, `PEPPER='${newPepper}'`);
      envContent = envContent.replace(/^OLD_PEPPER=.*$/m, `OLD_PEPPER='${process.env.OLD_PEPPER}'`);
      fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
      
      // Update pepper info using secure storage
      const newPepperInfo: PepperInfo = {
        value: newPepper,
        createdAt: now.toISOString()
      };
      storePepperInfo(newPepperInfo);
      
      // Create another backup after rotation
      await backupPepperValues();
      
      console.log('Pepper rotated successfully with backups');
      
      // TODO: Implement password rehashing for existing users
      // This would require iterating through all users and rehashing their passwords
      // with the new pepper
    }
  } catch (error) {
    console.error('Error rotating pepper:', error);
  }
} 