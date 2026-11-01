import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ architectureId: string }> }
) {
  const { architectureId } = await params;
  await prisma.architecture.delete({
    where: { id: architectureId },
  });

  return NextResponse.json({ deleted: true });
}
