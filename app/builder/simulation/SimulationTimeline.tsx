"use client";

import { ChaosEvent } from "@/types/Simulation";

interface Props {
  duration: number;
  events: ChaosEvent[];
}

export default function SimulationTimeline({ duration, events }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Chaos Timeline</h3>

      <div className="relative h-32 border rounded bg-gray-50">
        {events.map((e) => {
          const left = (e.startTime / duration) * 100;
          const width = ((e.endTime - e.startTime) / duration) * 100;

          const color = {
            NODE_CRASH: "#FF3B30",
            LATENCY_SPIKE: "#FF9500",
            CAPACITY_DROP: "#FFCC00",
            CONNECTION_CUT: "#5856D6",
            TRAFFIC_SURGE: "#34C759",
          }[e.type];

          return (
            <div
              key={e.id}
              className="absolute top-4 h-6 rounded text-xs text-white flex items-center justify-center"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: color,
              }}
            >
              {e.type}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        0s — {duration}s
      </div>
    </div>
  );
}
