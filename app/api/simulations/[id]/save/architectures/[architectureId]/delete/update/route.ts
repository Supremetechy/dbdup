import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ architectureId: string }> }
) {
  const { architectureId } = await params;
  const body = await req.json();

  const architecture = await prisma.architecture.update({
    where: { id: architectureId },
    data: {
      name: body.name,
      tags: body.tags,
    },
  });

  return NextResponse.json(architecture);
}
