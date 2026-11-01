import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const simulation = await prisma.simulationResult.create({
    data: {
      architectureId: body.architectureId,
      baseRps: body.config.baseRps,
      durationSeconds: body.config.durationSeconds,
      defaultCapacityRps: body.config.defaultCapacityRps,
      defaultLatencyMs: body.config.defaultLatencyMs,
      enableJitter: body.config.enableJitter,
      jitterAmplitudeRps: body.config.jitterAmplitudeRps,
      jitterPeriodSeconds: body.config.jitterPeriodSeconds,

      timeline: {
        create: body.timeline.map((tick: any) => ({
          time: tick.time,
          metrics: {
            create: tick.components.map((m: any) => ({
              componentId: m.id,
              name: m.name,
              kind: m.kind,
              rps: m.rps,
              saturation: m.saturation,
              latencyMs: m.latencyMs,
              errorRate: m.errorRate,
            })),
          },
        })),
      },
    },
  });

  return NextResponse.json(simulation);
}
