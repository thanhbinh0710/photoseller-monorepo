import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@photoseller.com' },
    update: {},
    create: {
      email: 'admin@photoseller.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'PhotoSeller',
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create test regular users
  const user1Password = await bcrypt.hash('user123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: user1Password,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      isActive: true,
    },
  });
  console.log('✅ Created test user:', user1.email);

  const user2Password = await bcrypt.hash('user123', 10);
  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      password: user2Password,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'USER',
      isActive: true,
    },
  });
  console.log('✅ Created test user:', user2.email);

  // Create telephones for user1
  await prisma.telephone.upsert({
    where: { id: 1 },
    update: {},
    create: {
      phoneNumber: '+84901234567',
      isPrimary: true,
      userId: user1.id,
    },
  });
  await prisma.telephone.upsert({
    where: { id: 2 },
    update: {},
    create: {
      phoneNumber: '+84907654321',
      isPrimary: false,
      userId: user1.id,
    },
  });
  console.log('✅ Created telephones for user1');

  // Create addresses for user1
  await prisma.address.upsert({
    where: { id: 1 },
    update: {},
    create: {
      label: 'Home',
      street: '123 Nguyen Hue St',
      city: 'Ho Chi Minh City',
      state: 'Ho Chi Minh',
      postalCode: '700000',
      country: 'Vietnam',
      isPrimary: true,
      userId: user1.id,
    },
  });
  await prisma.address.upsert({
    where: { id: 2 },
    update: {},
    create: {
      label: 'Office',
      street: '456 Le Loi St',
      city: 'Ho Chi Minh City',
      state: 'Ho Chi Minh',
      postalCode: '700000',
      country: 'Vietnam',
      isPrimary: false,
      userId: user1.id,
    },
  });
  console.log('✅ Created addresses for user1');

  // Create telephones for user2
  await prisma.telephone.upsert({
    where: { id: 3 },
    update: {},
    create: {
      phoneNumber: '+84912345678',
      isPrimary: true,
      userId: user2.id,
    },
  });
  console.log('✅ Created telephones for user2');

  // Create addresses for user2
  await prisma.address.upsert({
    where: { id: 3 },
    update: {},
    create: {
      label: 'Home',
      street: '789 Tran Hung Dao St',
      city: 'Hanoi',
      state: 'Hanoi',
      postalCode: '100000',
      country: 'Vietnam',
      isPrimary: true,
      userId: user2.id,
    },
  });
  console.log('✅ Created addresses for user2');

  // Create categories
  const botanical = await prisma.category.upsert({
    where: { slug: 'botanical' },
    update: {},
    create: {
      name: 'Botanical',
      slug: 'botanical',
    },
  });
  console.log('✅ Created category:', botanical.name);

  const stillLife = await prisma.category.upsert({
    where: { slug: 'still-life' },
    update: {},
    create: {
      name: 'Still-Life',
      slug: 'still-life',
    },
  });
  console.log('✅ Created category:', stillLife.name);

  const portrait = await prisma.category.upsert({
    where: { slug: 'portrait' },
    update: {},
    create: {
      name: 'Portrait',
      slug: 'portrait',
    },
  });
  console.log('✅ Created category:', portrait.name);

  // Create sizes
  const sizeA4 = await prisma.size.upsert({
    where: { name: 'A4' },
    update: {},
    create: {
      name: 'A4',
      dimensions: '21×29.7cm',
      widthCm: 21.0,
      heightCm: 29.7,
    },
  });
  console.log('✅ Created size:', sizeA4.name);

  const sizeA3 = await prisma.size.upsert({
    where: { name: 'A3' },
    update: {},
    create: {
      name: 'A3',
      dimensions: '29.7×42cm',
      widthCm: 29.7,
      heightCm: 42.0,
    },
  });
  console.log('✅ Created size:', sizeA3.name);

  const sizeA2 = await prisma.size.upsert({
    where: { name: 'A2' },
    update: {},
    create: {
      name: 'A2',
      dimensions: '42×59.4cm',
      widthCm: 42.0,
      heightCm: 59.4,
    },
  });
  console.log('✅ Created size:', sizeA2.name);

  const sizeA1 = await prisma.size.upsert({
    where: { name: 'A1' },
    update: {},
    create: {
      name: 'A1',
      dimensions: '59.4×84.1cm',
      widthCm: 59.4,
      heightCm: 84.1,
    },
  });
  console.log('✅ Created size:', sizeA1.name);

  // Prepare size array for random assignment
  const sizes = [sizeA4, sizeA3, sizeA2, sizeA1];
  
  // Price range for random pricing (in dollars)
  const priceMin = 29.99;
  const priceMax = 79.99;

  // Auto-import all photos from storage folders
  const photoFolders = [
    { folder: 'botanical', category: botanical, categoryName: 'Botanical' },
    { folder: 'still-life', category: stillLife, categoryName: 'Still-Life' },
    { folder: 'portrait', category: portrait, categoryName: 'Portrait' },
  ];

  let totalPhotosCreated = 0;

  for (const { folder, category, categoryName } of photoFolders) {
    const folderPath = path.join(__dirname, '..', 'storage', 'photo', folder);
    
    // Read all files from the folder
    const files = fs.readdirSync(folderPath).filter(file => {
      // Skip .gitkeep and only process image files
      return file !== '.gitkeep' && /\.(jpg|jpeg|png)$/i.test(file);
    });

    console.log(`\n📂 Processing ${categoryName} folder: ${files.length} photos found`);

    for (const file of files) {
      // Extract name without extension
      const nameWithoutExt = file.replace(/\.(jpg|jpeg|png)$/i, '');
      
      // Generate slug from filename (lowercase, replace special chars with hyphens)
      const slug = `${nameWithoutExt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${folder}`;
      
      // Random size selection
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      
      // Random price within range
      const randomPrice = parseFloat(
        (priceMin + Math.random() * (priceMax - priceMin)).toFixed(2)
      );

      // Create photo record
      await prisma.photo.upsert({
        where: { slug },
        update: {},
        create: {
          name: nameWithoutExt,
          slug: slug,
          imageUrl: `/storage/photo/${folder}/${file}`,
          stock: 10, // Default stock
          price: randomPrice,
          isActive: true,
          categoryId: category.id,
          sizeId: randomSize.id,
        },
      });

      totalPhotosCreated++;
    }

    console.log(`✅ Created ${files.length} photos in ${categoryName} category`);
  }

  console.log(`\n🎉 Successfully seeded ${totalPhotosCreated} photos from storage folders!`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@photoseller.com / admin123');
  console.log('User 1: user1@example.com / user123');
  console.log('User 2: user2@example.com / user123');
  console.log('\n📦 Seeded Data:');
  console.log('- 3 users (1 admin, 2 regular users)');
  console.log('- 3 telephones (user1: 2, user2: 1)');
  console.log('- 3 addresses (user1: 2, user2: 1)');
  console.log('- 3 categories (Botanical, Still-Life, Portrait)');
  console.log('- 4 sizes (A4, A3, A2, A1)');
  console.log(`- ${totalPhotosCreated} photos imported from storage folders`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
