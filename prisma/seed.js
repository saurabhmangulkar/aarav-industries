const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Database ---');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aaravindustries.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'System Administrator',
      password: hashedPassword,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      companyName: 'Aarav Industries',
      tagline: 'Quality Manufacturing. Reliable Solutions.',
      phone: '+91 98765 43210',
      email: 'sales@aaravindustries.example',
      address: 'Plot No. 42, MIDC Industrial Area, Hingna Road, Nagpur, Maharashtra - 440016',
      whatsappNumber: '+919876543210',
      aboutSummary: 'Aarav Industries is a premier industrial manufacturing enterprise producing high-precision mechanical fasteners, stainless steel parts, structural fabrications, and customized engineering components for heavy equipment, automotive, and infrastructure sectors.',
    },
  });

  const categoriesData = [
    { name: 'Fasteners', slug: 'fasteners', description: 'High-tensile industrial bolts, nuts, studs, and heavy-duty anchors.' },
    { name: 'Metal Components', slug: 'metal-components', description: 'CNC machined stainless steel and brass precision engineering components.' },
    { name: 'Fabrication', slug: 'fabrication', description: 'Sheet metal, welded assemblies, and custom architectural enclosures.' },
    { name: 'Industrial Parts', slug: 'industrial-parts', description: 'Heavy-duty brackets, bushings, structural mounts, and mechanical flanges.' },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories.push(createdCat);
  }

  const productsData = [
    {
      name: 'Industrial High-Tensile Fasteners',
      slug: 'industrial-fasteners',
      shortDescription: 'Precision-manufactured grade 8.8 & 10.9 fasteners for high-stress structural joints.',
      description: 'Engineered from hardened alloy steel, Aarav Industries fasteners undergo rigorous heat treatment and dimensional testing. Widely deployed across structural engineering, wind towers, power plants, and rail infrastructure.',
      specifications: 'Material: Grade 8.8, 10.9, 12.9 Alloy Steel\nFinish: Hot-Dip Galvanized, Zinc Flake\nStandards: ISO 898-1, DIN 931\nDiameter Range: M12 to M64',
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      published: true,
      categorySlug: 'fasteners',
    },
    {
      name: 'Precision Stainless Steel Components',
      slug: 'stainless-steel-components',
      shortDescription: 'Multi-axis CNC turned stainless steel shafts, sleeves, and fluid connectors.',
      description: 'Our CNC turning centers produce SS304 and SS316 grade precision components with tolerances down to 5 microns. Ideal for chemical pumps, hydraulic assemblies, and marine machinery.',
      specifications: 'Material Grades: AISI 304, 316L, 410\nTolerance: ±0.005mm\nSurface Roughness: Ra 0.4\nTesting: Ultrasonic and Hydrostatic testing certified',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      published: true,
      categorySlug: 'metal-components',
    },
    {
      name: 'Precision Fabricated Structural Enclosures',
      slug: 'precision-fabricated-parts',
      shortDescription: 'Custom laser-cut, CNC bent, and robotically welded metal assemblies.',
      description: 'Heavy gauge steel and aluminum fabrication built for electrical power distribution units, machinery housings, and transport frames. Finished with high-durability electrostatic powder coating.',
      specifications: 'Sheet Thickness: 1.0mm to 25.0mm\nWelding: Robotic MIG/TIG certified to AWS D1.1\nCoating: AkzoNobel industrial powder coat (80+ microns)',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      published: true,
      categorySlug: 'fabrication',
    },
    {
      name: 'Heavy-Duty Industrial Brackets',
      slug: 'industrial-brackets',
      shortDescription: 'Vibration-resistant structural mounting brackets for high-load industrial machinery.',
      description: 'Reinforced industrial brackets forged and stamped for severe operating environments. Designed to dampen harmonic vibration in motors, pumps, and conveyor assemblies.',
      specifications: 'Material: IS 2062 Grade E250/E350 structural steel\nCorrosion Protection: Epoxy primer with polyurethane topcoat\nYield Strength: > 350 MPa',
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      published: true,
      categorySlug: 'industrial-parts',
    }
  ];

  for (const prod of productsData) {
    const cat = categories.find((c) => c.slug === prod.categorySlug);
    if (!cat) continue;

    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        name: prod.name,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        description: prod.description,
        specifications: prod.specifications,
        image: prod.image,
        featured: prod.featured,
        published: prod.published,
        categoryId: cat.id,
      },
    });
  }

  const sampleProduct = await prisma.product.findFirst();
  await prisma.enquiry.createMany({
    data: [
      {
        name: 'Rajesh Sharma',
        company: 'Bharat Heavy Equipments Ltd',
        email: 'r.sharma@bhel-sample.in',
        phone: '+91 98220 11223',
        message: 'Looking for a monthly supply of M24 high-tensile fasteners (approx 10,000 units/month). Please share mill test certificates and pricing.',
        status: 'NEW',
        productId: sampleProduct ? sampleProduct.id : null,
      }
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });