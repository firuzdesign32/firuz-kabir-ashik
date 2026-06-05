import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const portfolio = await prisma.portfolio.findUnique({
      where: { id }
    });
    if (!portfolio) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        thumbnail: data.thumbnail,
        coverImage: data.coverImage,
        galleryImages: data.galleryImages,
        videos: data.videos,
        gifs: data.gifs,
        description: data.description,
        clientName: data.clientName,
        projectDate: data.projectDate ? new Date(data.projectDate) : null,
        tags: data.tags,
        featured: data.featured,
        status: data.status,
        displayOrder: data.displayOrder,
      }
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.portfolio.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}

