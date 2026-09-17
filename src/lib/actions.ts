'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from './auth';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function createProduct(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const shortDescription = formData.get('shortDescription') as string;
  const description = formData.get('description') as string;
  const specifications = formData.get('specifications') as string;
  const categoryId = formData.get('categoryId') as string;
  const image = formData.get('image') as string;
  const published = formData.get('published') === 'true';
  const featured = formData.get('featured') === 'true';

  let slug = slugify((formData.get('slug') as string) || name);

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      shortDescription,
      description,
      specifications,
      categoryId,
      image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      published,
      featured,
    },
  });

  revalidatePath('/products');
  revalidatePath('/');
  revalidatePath('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const slug = slugify((formData.get('slug') as string) || name);
  const shortDescription = formData.get('shortDescription') as string;
  const description = formData.get('description') as string;
  const specifications = formData.get('specifications') as string;
  const categoryId = formData.get('categoryId') as string;
  const image = formData.get('image') as string;
  const published = formData.get('published') === 'true';
  const featured = formData.get('featured') === 'true';

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      shortDescription,
      description,
      specifications,
      categoryId,
      image,
      published,
      featured,
    },
  });

  revalidatePath('/products');
  revalidatePath(`/products/${slug}`);
  revalidatePath('/');
  revalidatePath('/admin/products');
}

export async function deleteProduct(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  await prisma.product.delete({ where: { id } });

  revalidatePath('/products');
  revalidatePath('/');
  revalidatePath('/admin/products');
}

export async function toggleProductStatus(id: string, field: 'published' | 'featured') {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error('Product not found');

  await prisma.product.update({
    where: { id },
    data: { [field]: !product[field] },
  });

  revalidatePath('/products');
  revalidatePath('/');
  revalidatePath('/admin/products');
}

export async function createCategory(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const slug = slugify(name);
  const description = formData.get('description') as string;

  await prisma.category.create({
    data: { name, slug, description },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/products');
}

export async function deleteCategory(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    throw new Error(`Cannot delete: ${count} product(s) are associated with this category.`);
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidatePath('/products');
}

export async function updateEnquiryStatus(id: string, status: 'NEW' | 'CONTACTED' | 'CLOSED') {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/admin/enquiries');
  revalidatePath('/admin/dashboard');
}

export async function updateSettings(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');

  const companyName = formData.get('companyName') as string;
  const tagline = formData.get('tagline') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const address = formData.get('address') as string;
  const whatsappNumber = formData.get('whatsappNumber') as string;
  const aboutSummary = formData.get('aboutSummary') as string;

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: { companyName, tagline, phone, email, address, whatsappNumber, aboutSummary },
    create: { id: 'default', companyName, tagline, phone, email, address, whatsappNumber, aboutSummary },
  });

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');
  revalidatePath('/admin/settings');
}