// Array of peppers, with the current pepper at index 0
const PEPPERS = [process.env.NEXT_PUBLIC_CURRENT_PEPPER, ...JSON.parse(process.env.NEXT_PUBLIC_OLD_PEPPERS || "[]")]

/**
 * Hashes a password using PBKDF2 with salt and pepper
 * @param {string} password - The password to hash
 * @returns {Promise<{hash: string, salt: string}>} - The hashed password and salt
 */
async function hashPassword(password) {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const pepper = PEPPERS[0] // Use the current pepper

  const passwordData = encoder.encode(password + pepper)
  const importedKey = await crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, ["deriveBits"])

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    importedKey,
    256,
  )

  const hashArray = Array.from(new Uint8Array(derivedBits))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  return { hash: hashHex, salt: saltHex }
}

/**
 * Verifies a password against a stored hash
 * @param {string} inputPassword - The password to verify
 * @param {string} storedHash - The stored hash to compare against
 * @param {string} storedSalt - The stored salt used in the original hash
 * @returns {Promise<boolean>} - True if the password is correct, false otherwise
 */
async function verifyPassword(inputPassword, storedHash, storedSalt) {
  const encoder = new TextEncoder()
  const salt = new Uint8Array(storedSalt.match(/.{1,2}/g).map((byte) => Number.parseInt(byte, 16)))

  for (const pepper of PEPPERS) {
    const passwordData = encoder.encode(inputPassword + pepper)
    const importedKey = await crypto.subtle.importKey("raw", passwordData, { name: "PBKDF2" }, false, ["deriveBits"])

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      importedKey,
      256,
    )

    const hashArray = Array.from(new Uint8Array(derivedBits))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    if (hashHex === storedHash) {
      return true
    }
  }

  return false
}

// Example usage and testing
async function testPasswordHashing() {
  const password = "MySecurePassword123!"

  console.log("Hashing password...")
  const { hash, salt } = await hashPassword(password)
  console.log("Hashed password:", hash)
  console.log("Salt:", salt)

  console.log("\nVerifying correct password...")
  const isValid = await verifyPassword(password, hash, salt)
  console.log("Password is valid:", isValid)

  console.log("\nVerifying incorrect password...")
  const isInvalid = await verifyPassword("WrongPassword", hash, salt)
  console.log("Password is valid:", isInvalid)
}

export { hashPassword, verifyPassword, testPasswordHashing }

