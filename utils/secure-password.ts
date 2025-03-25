/**
 * Securely hash a password using Argon2 with salt and pepper
 * @param password The password to hash
 * @returns The salt and hash
 */
export async function hashPassword(password: string): Promise<{ salt: string; hash: string }> {
  try {
    const response = await fetch('/api/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'hash',
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to hash password');
    }

    return await response.json();
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

/**
 * Verify a password against a stored hash
 * @param hash The stored hash
 * @param password The password to verify
 * @param salt The salt used for hashing
 * @returns Whether the password is valid
 */
export async function verifyPassword(
  hash: string,
  password: string,
  salt: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'verify',
        hash,
        password,
        salt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify password');
    }

    const result = await response.json();
    return result.verified;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
} 