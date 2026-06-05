const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create SUPER_ADMIN User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@firuzkabirashik.com' },
    update: {},
    create: {
      email: 'admin@firuzkabirashik.com',
      name: 'Firuz Kabir Ashik',
      hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // 2. Create Site Settings
  const settings = [
    { key: 'hero_headline', value: 'Elevating Brands Through 3D Motion' },
    { key: 'hero_subheadline', value: 'I craft cinematic 3D animations and motion graphics for forward-thinking tech and FMCG brands worldwide.' },
    { key: 'about_bio', value: '<p>Hi, I am Firuz Kabir Ashik. With over 7 years of experience in the 3D motion design industry, I specialize in creating high-end product commercials and abstract animations that captivate audiences and drive results.</p>' },
    { key: 'about_years_exp', value: '7' },
    { key: 'about_projects_completed', value: '150+' },
    { key: 'about_happy_clients', value: '45' },
    { key: 'contact_email', value: 'hello@firuzkabirashik.com' },
    { key: 'social_instagram', value: 'https://instagram.com/' },
    { key: 'social_behance', value: 'https://behance.net/' },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('Created site settings');

  // 3. Create Portfolios
  const portfolios = [
    {
      title: 'Neon Energy Drink Commercial',
      slug: 'neon-energy-drink',
      category: 'FMCG',
      thumbnail: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=1600&q=80',
      description: '<p>A high-energy, neon-infused 3D commercial for a new energy drink brand. Created entirely in Cinema 4D and Redshift.</p>',
      clientName: 'Neon Beverage Co.',
      tags: ['3D', 'Motion Graphics', 'FMCG', 'Redshift'],
      featured: true,
      status: 'PUBLISHED',
      displayOrder: 1,
    },
    {
      title: 'Aura Smartphone Launch',
      slug: 'aura-smartphone',
      category: 'Tech',
      thumbnail: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      coverImage: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1600&q=80',
      description: '<p>Abstract product reveal focusing on the sleek curves and glass back of the new Aura Smartphone.</p>',
      clientName: 'Aura Tech',
      tags: ['Product Visualization', 'Tech', 'Octane'],
      featured: true,
      status: 'PUBLISHED',
      displayOrder: 2,
    }
  ];

  for (const portfolio of portfolios) {
    await prisma.portfolio.upsert({
      where: { slug: portfolio.slug },
      update: {},
      create: portfolio,
    });
  }
  console.log('Created portfolio items');

  // 4. Create Products
  const products = [
    {
      name: 'Cinematic Lighting Presets (Cinema 4D / Redshift)',
      slug: 'cinematic-lighting-presets',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      price: 29.99,
      description: '<p>Speed up your workflow with 15 highly customizable, cinematic lighting rigs built specifically for Cinema 4D and Redshift.</p>',
      category: 'Assets',
      productFileUrl: 'https://example.com/download/lighting-presets.zip',
      type: 'ASSET_PACK',
      status: 'PUBLISHED',
    },
    {
      name: 'Abstract Metal Materials Pack',
      slug: 'abstract-metal-materials',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      price: 19.99,
      discountPrice: 14.99,
      description: '<p>A collection of 20 procedural metal materials perfect for abstract tech renders.</p>',
      category: 'Materials',
      productFileUrl: 'https://example.com/download/metal-materials.zip',
      type: 'ASSET_PACK',
      status: 'PUBLISHED',
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log('Created digital products');

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
