import {
  beforeAll,
  afterAll,
  vi,
  expect,
  test
} from 'vitest'
import { encrypt, decrypt } from '@/lib/crypto'

beforeAll(async () => {
  vi.stubEnv('APP_API_SECRET', 'appapisecret|666')
  vi.stubEnv('APP_API_SALT', 'appapisalt')
  vi.stubEnv('APP_API_PHRASE', 'appapiphrase')
})

afterAll(() => {
  vi.unstubAllEnvs()
})

test('encrypt() and decrypt()', async () => {
  const testText = 'Hello world!'
  const encrypted = encrypt(testText)
  const decrypted = decrypt(encrypted)
  expect(decrypted).eq(testText)
})

test('decrypt() APP_APIPHRASE', async () => {
  const phrase = '1ba536f1d95f6ced80f8d21e0a9337ec|f7e8e290d9fe34365f05e3b5473f45cf'
  const decrypted = decrypt(phrase)
  expect(decrypted).eq('appapiphrase')
})
