import { prisma } from "@repo/db"


async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing todos
  await prisma.user.deleteMany()

  // Create example todos
  const todos = await prisma.user.createMany({
    data: [
      {email : "nobitakaif@gmail.com", password : "nobitakaif"},
      {email : "nobitakaif1@gmail.com", password : "nobitakaif"},
      {email : "nobitakaif11@gmail.com", password : "nobitakaif"},

    ],
  })

  console.log(`✅ Created ${todos.count} todos`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
