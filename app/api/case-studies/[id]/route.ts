import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });
    if (!caseStudy) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        clientName: data.clientName,
        industry: data.industry,
        challenge: data.challenge,
        solution: data.solution,
        process: data.process,
        results: data.results,
        media: data.media || [],
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        ogImage: data.ogImage,
      },
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
