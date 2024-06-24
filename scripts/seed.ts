import pg from 'pg'
import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { faker } from '@faker-js/faker'
import { DB_URL } from '@/app.config'
import { product } from '@/lib/db/schema'

dotenv.config({ path: './.env' })
const { Pool } = pg

if (!DB_URL) {
    console.error('DATABASE_URL not found in .env')
    process.exit(1)
}

const main = async () => {
    const pool = new Pool({
        connectionString: DB_URL,
    })
    const db = drizzle(pool)

    const productsData = []

    for (let i = 0; i < 20; i++) {
        productsData.push({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 100, max: 1000, dec: 2, symbol: '' }), 
            quantity: faker.number.int({ min: 1, max: 100 }), 
            image: faker.image.url(), 
        });
    }

    console.log('Seed start')
    await db.insert(product).values(productsData).execute()
    console.log('Seed done')
    await pool.end()
}

main().catch((error) => {
    console.error('Failed to seed products:', error)
    process.exit(1)
})
