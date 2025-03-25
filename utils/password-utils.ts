import crypto from 'crypto';
import { getPepperInfo } from './secure-pepper-storage';

/**
 * Hash a password using SHA-256 with a pepper
 */
export async function hashPassword(
  password: string
): Promise<{ salt: string; hash: string }> {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
    
  return { salt, hash };
}

/**
 * Compare a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password);
  return crypto.timingSafeEqual(
    Buffer.from(hashedInput.hash),
    Buffer.from(hash)
  );
} 