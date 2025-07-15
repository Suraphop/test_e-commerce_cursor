import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Electronics' },
      update: {},
      create: { name: 'Electronics' }
    }),
    prisma.category.upsert({
      where: { name: 'Clothing' },
      update: {},
      create: { name: 'Clothing' }
    }),
    prisma.category.upsert({
      where: { name: 'Books' },
      update: {},
      create: { name: 'Books' }
    }),
    prisma.category.upsert({
      where: { name: 'Home & Garden' },
      update: {},
      create: { name: 'Home & Garden' }
    }),
    prisma.category.upsert({
      where: { name: 'Sports' },
      update: {},
      create: { name: 'Sports' }
    })
  ])

  console.log('✅ Categories created')

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro',
        description: 'The latest iPhone with advanced camera system and A17 Pro chip',
        price: 999.99,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
        categoryId: categories[0].id // Electronics
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Air M2',
        description: 'Lightweight laptop with powerful M2 chip and all-day battery life',
        price: 1199.99,
        stock: 30,
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
        categoryId: categories[0].id // Electronics
      }
    }),
    prisma.product.create({
      data: {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Air Max technology',
        price: 129.99,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
        categoryId: categories[1].id // Clothing
      }
    }),
    prisma.product.create({
      data: {
        name: 'The Great Gatsby',
        description: 'Classic American novel by F. Scott Fitzgerald',
        price: 12.99,
        stock: 200,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
        categoryId: categories[2].id // Books
      }
    }),
    prisma.product.create({
      data: {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable timer',
        price: 89.99,
        stock: 25,
        images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500'],
        categoryId: categories[3].id // Home & Garden
      }
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat',
        description: 'Premium non-slip yoga mat for home workouts',
        price: 29.99,
        stock: 75,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500'],
        categoryId: categories[4].id // Sports
      }
    })
  ])

  console.log('✅ Products created')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$HO9vN4RohbOvj30aQUKPLusD3xYm2ddYkJGBZ8vdwfRJ.tKymHCi6', // password: admin123
      role: 'ADMIN'
    }
  })

  // Add new test admin user
  const testAdminUser = await prisma.user.upsert({
    where: { email: 'testuser@mail.com' },
    update: {},
    create: {
      name: 'Test Admin',
      email: 'testuser@mail.com',
      password: '$2b$10$QwQwQwQwQwQwQwQwQwQwQeQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw', // password: test123 (replace with real hash)
      role: 'ADMIN'
    }
  })

  console.log('✅ Admin user created')
  console.log('✅ Test admin user created')

  // Create test customer
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Test Customer',
      email: 'customer@example.com',
      password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu1.m', // password: customer123
      role: 'CUSTOMER'
    }
  })

  console.log('✅ Customer user created')

  // Create some sample reviews
  await Promise.all([
    prisma.review.upsert({
      where: { id: 'review-1' },
      update: {},
      create: {
        id: 'review-1',
        userId: customerUser.id,
        productId: products[0].id, // iPhone 15 Pro
        rating: 5,
        comment: 'Amazing phone! The camera quality is outstanding.'
      }
    }),
    prisma.review.upsert({
      where: { id: 'review-2' },
      update: {},
      create: {
        id: 'review-2',
        userId: customerUser.id,
        productId: products[1].id, // MacBook Air
        rating: 4,
        comment: 'Great laptop, very fast and lightweight.'
      }
    })
  ])

  console.log('✅ Reviews created')

  console.log('🎉 Database seeding completed!')
  console.log('\n📋 Sample Data:')
  console.log(`- Categories: ${categories.length}`)
  console.log(`- Products: ${products.length}`)
  console.log(`- Users: 2 (Admin + Customer)`)
  console.log('\n🔑 Test Credentials:')
  console.log('Admin: admin@example.com / admin123')
  console.log('Customer: customer@example.com / customer123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 