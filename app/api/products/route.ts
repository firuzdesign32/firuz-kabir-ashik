import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        thumbnail: data.thumbnail,
        gallery: data.gallery || [],
        price: data.price,
        discountPrice: data.discountPrice,
        description: data.description,
        category: data.category,
        productFileUrl: data.productFileUrl,
        previewFileUrl: data.previewFileUrl,
        type: data.type,
        status: data.status || 'DRAFT',
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
