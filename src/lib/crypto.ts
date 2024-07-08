import crypto from 'crypto'
import { APP_API_SECRET, APP_API_SALT } from '@/app.config'

const algorithm = 'aes256'
const secretKey = crypto.scryptSync(
  APP_API_SECRET, 
  APP_API_SALT, 
  32
)

export interface EncryptionHash {
  iv: string
  content: string
}

const encrypt = (clearText: string): string => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = cipher.update(clearText, 'utf8', 'hex')

  return [
    encrypted + cipher.final('hex'),
    Buffer.from(iv).toString('hex'),
  ].join('|')
}

const decrypt = (encryptedText: string): string => {
  try {
    const [encrypted, iv] = encryptedText.split('|')
    
    if (!iv) throw new Error('IV not found')
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, 'hex'),
    )

    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error
  }
}

export { 
  encrypt, 
  decrypt 
}