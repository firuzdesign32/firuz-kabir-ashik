import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    return NextResponse.json(portfolios);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const portfolio = await prisma.portfolio.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        thumbnail: data.thumbnail,
        coverImage: data.coverImage,
        galleryImages: data.galleryImages || [],
        videos: data.videos || [],
        gifs: data.gifs || [],
        description: data.description,
        clientName: data.clientName,
        projectDate: data.projectDate ? new Date(data.projectDate) : null,
        tags: data.tags || [],
        featured: data.featured || false,
        status: data.status || 'DRAFT',
        displayOrder: data.displayOrder || 0,
      }
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}
