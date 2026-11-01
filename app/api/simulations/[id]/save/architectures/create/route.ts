import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const architecture = await prisma.architecture.create({
    data: {
      name: body.name,
      tags: body.tags ?? [],
      components: {
        create: body.components ?? [],
      },
      connections: {
        create: body.connections ?? [],
      },
    },
  });

  return NextResponse.json(architecture);
}
