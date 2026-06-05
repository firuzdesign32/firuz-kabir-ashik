import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(caseStudies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const caseStudy = await prisma.caseStudy.create({
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
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}
