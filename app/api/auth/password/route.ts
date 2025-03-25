import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

// Create a temporary Python script file
async function createPythonScript() {
  const tempDir = os.tmpdir();
  const scriptPath = path.join(tempDir, 'password_hasher.py');
  
  const scriptContent = `
import os
import time
import hashlib
import json
import sys
import argon2

# Load the pepper from environment variables
PEPPER = os.getenv('PEPPER')
OLD_PEPPER = os.getenv('OLD_PEPPER')

def generate_salt():
    """Generate a unique salt for each user."""
    return os.urandom(16).hex()

def hash_password(password, salt):
    """Hash the password with the given salt and pepper."""
    if not PEPPER:
        raise ValueError("Pepper is not set in environment variables.")
    
    # Combine the password, salt, and pepper
    password_with_salt_and_pepper = f"{password}{salt}{PEPPER}"
    
    # Hash the combined string using argon2
    return argon2.hash_password(password_with_salt_and_pepper.encode()).decode()

def verify_password(stored_hash, password, salt):
    """Verify the password against the stored hash."""
    try:
        # Combine the password, salt, and pepper for verification
        password_with_salt_and_pepper = f"{password}{salt}{PEPPER}"
        argon2.verify_password(stored_hash.encode(), password_with_salt_and_pepper.encode())
        return True
    except:
        # Try with old pepper if verification fails
        if OLD_PEPPER:
            try:
                password_with_salt_and_old_pepper = f"{password}{salt}{OLD_PEPPER}"
                argon2.verify_password(stored_hash.encode(), password_with_salt_and_old_pepper.encode())
                return True
            except:
                return False
        return False

# Parse command line arguments
if __name__ == "__main__":
    action = sys.argv[1]
    
    if action == "hash":
        password = sys.argv[2]
        salt = generate_salt()
        hashed = hash_password(password, salt)
        print(json.dumps({"salt": salt, "hash": hashed}))
    
    elif action == "verify":
        stored_hash = sys.argv[2]
        password = sys.argv[3]
        salt = sys.argv[4]
        result = verify_password(stored_hash, password, salt)
        print(json.dumps({"verified": result}))
  `;
  
  await fs.writeFile(scriptPath, scriptContent);
  return scriptPath;
}

export async function POST(request: NextRequest) {
  try {
    const { action, password, hash, salt } = await request.json();
    
    // Create the Python script
    const scriptPath = await createPythonScript();
    
    // Set environment variables for the Python process
    const env = {
      ...process.env,
      PEPPER: process.env.PASSWORD_PEPPER || 'default-pepper-value',
      OLD_PEPPER: process.env.OLD_PASSWORD_PEPPER || '',
    };
    
    let command;
    if (action === 'hash') {
      command = `python ${scriptPath} hash "${password}"`;
    } else if (action === 'verify') {
      command = `python ${scriptPath} verify "${hash}" "${password}" "${salt}"`;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    const { stdout } = await execAsync(command, { env });
    const result = JSON.parse(stdout.trim());
    
    // Clean up the temporary script file
    await fs.unlink(scriptPath);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Password hashing error:', error);
    return NextResponse.json({ error: 'Password processing failed' }, { status: 500 });
  }
} 