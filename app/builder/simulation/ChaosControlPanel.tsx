"use client";

import { useState } from "react";
import { ChaosEvent, ChaosEventType } from "@/types/Simulation";

interface Props {
  components: { id: string; name: string }[];
  connections: { id: string; sourceId: string; targetId: string }[];
  onTrigger: (event: ChaosEvent) => void;
}

export default function ChaosControlPanel({
  components,
  connections,
  onTrigger,
}: Props) {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [selectedConnection, setSelectedConnection] = useState<string>("");

  function fire(type: ChaosEventType, extra: any = {}) {
    onTrigger({
      id: crypto.randomUUID(),
      type,
      startTime: 0,
      endTime: 9999,
      componentId: selectedComponent || undefined,
      connectionId: selectedConnection || undefined,
      ...extra,
    });
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">Chaos Controls</h3>

      {/* Component selector */}
      <select
        className="border p-2 rounded w-full"
        value={selectedComponent}
        onChange={(e) => setSelectedComponent(e.target.value)}
      >
        <option value="">Select Component</option>
        {components.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Connection selector */}
      <select
        className="border p-2 rounded w-full"
        value={selectedConnection}
        onChange={(e) => setSelectedConnection(e.target.value)}
      >
        <option value="">Select Connection</option>
        {connections.map((c) => (
          <option key={c.id} value={c.id}>
            {c.sourceId} → {c.targetId}
          </option>
        ))}
      </select>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          className="bg-red-600 text-white p-2 rounded"
          onClick={() => fire("NODE_CRASH")}
        >
          Crash Node
        </button>

        <button
          className="bg-yellow-500 text-white p-2 rounded"
          onClick={() => fire("LATENCY_SPIKE", { latencyMultiplier: 5 })}
        >
          Latency Spike
        </button>

        <button
          className="bg-orange-600 text-white p-2 rounded"
          onClick={() => fire("CAPACITY_DROP", { capacityMultiplier: 0.3 })}
        >
          Capacity Drop
        </button>

        <button
          className="bg-purple-600 text-white p-2 rounded"
          onClick={() => fire("CONNECTION_CUT")}
        >
          Cut Connection
        </button>

        <button
          className="bg-blue-600 text-white p-2 rounded col-span-2"
          onClick={() => fire("TRAFFIC_SURGE", { surgeRps: 500 })}
        >
          Traffic Surge
        </button>
      </div>
    </div>
  );
}
