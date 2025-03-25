import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PEPPER_FILE = path.join(process.cwd(), '.pepper-info.encrypted');
// Store this key in environment variables, not in code
const ENCRYPTION_KEY = process.env.PEPPER_ENCRYPTION_KEY || '';

interface PepperInfo {
  value: string;
  createdAt: string;
}

export function encryptAndSavePepperInfo(pepperInfo: PepperInfo): void {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(JSON.stringify(pepperInfo), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Store IV, authTag, and encrypted data
  const dataToStore = JSON.stringify({
    iv: iv.toString('hex'),
    authTag,
    data: encrypted
  });
  
  fs.writeFileSync(PEPPER_FILE, dataToStore);
}

export function readAndDecryptPepperInfo(): PepperInfo {
  if (!fs.existsSync(PEPPER_FILE)) {
    throw new Error('Pepper info file not found');
  }
  
  const fileContent = fs.readFileSync(PEPPER_FILE, 'utf8');
  const { iv, authTag, data } = JSON.parse(fileContent);
  
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm', 
    Buffer.from(ENCRYPTION_KEY, 'hex'), 
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
} 