import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean existing records (optional, or upsert)
  await prisma.companyImage.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash('Password123!', saltRounds);

  // 2. Create ADMIN User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@projectm.com',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('✅ Created ADMIN user: admin@projectm.com / Password123!');

  // 3. Create ADD_COMPANY User
  const operatorUser = await prisma.user.create({
    data: {
      email: 'operator@projectm.com',
      passwordHash,
      role: 'ADD_COMPANY',
    },
  });
  console.log('✅ Created ADD_COMPANY user: operator@projectm.com / Password123!');

  // 4. Seed Initial Companies with multi-image support
  const company1 = await prisma.company.create({
    data: {
      name: 'Apex Cloud Technologies',
      contactPerson: 'Sarah Jenkins',
      contactNumber: '+1 4155552345',
      alternateContactNumber: '+1 4155559876',
      email: 'contact@apexcloud.io',
      createdById: adminUser.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'BlueWave Digital Media',
      contactPerson: 'David Larson',
      contactNumber: '+44 2079460912',
      alternateContactNumber: '+44 2079460913',
      email: 'hello@bluewavemedia.co.uk',
      createdById: operatorUser.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  const company3 = await prisma.company.create({
    data: {
      name: 'Quantum Nexus Robotics',
      contactPerson: 'Dr. Aris Thorne',
      contactNumber: '+91 9876543210',
      alternateContactNumber: null,
      email: 'info@quantumnexus.ai',
      createdById: adminUser.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  const company4 = await prisma.company.create({
    data: {
      name: 'Starlight Financial Partners',
      contactPerson: 'Robert Vance',
      contactNumber: '+91 8807649359',
      alternateContactNumber: '+91 9123456789',
      email: 'partners@starlightfinancial.com',
      createdById: operatorUser.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80' },
          { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80' },
        ],
      },
    },
  });

  console.log(`✅ Seeded 4 sample companies with contactPerson and multiple images.`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
