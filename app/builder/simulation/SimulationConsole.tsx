"use client";

import { useEffect, useState } from "react";
import { SimulationTick } from "@/types/Simulation";

interface Props {
  stream: AsyncGenerator<SimulationTick>; // live simulation generator
}

export default function SimulationConsole({ stream }: Props) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTick, setCurrentTick] = useState<SimulationTick | null>(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      for await (const tick of stream) {
        if (!mounted) break;

        setCurrentTick(tick);

        const bottleneck = tick.components.reduce((max, c) =>
          c.saturation > max.saturation ? c : max
        );

        const line = `Tick ${tick.time}: bottleneck=${bottleneck.name} sat=${(
          bottleneck.saturation * 100
        ).toFixed(1)}% latency=${bottleneck.latencyMs.toFixed(1)}ms`;

        setLogs((prev) => [...prev.slice(-200), line]); // keep last 200 lines
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [stream]);

  return (
    <div className="bg-black text-green-400 p-4 rounded-lg h-64 overflow-auto font-mono text-sm">
      {logs.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}
