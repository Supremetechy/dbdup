import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const simulation = await prisma.simulationResult.findUnique({
    where: { id },
    include: {
      timeline: {
        include: {
          metrics: true,
        },
      },
    },
  });

  return NextResponse.json(simulation);
}
