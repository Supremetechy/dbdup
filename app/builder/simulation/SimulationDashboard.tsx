"use client";

import { useState, useMemo } from "react";
import { SimulationResult, SimulationTick } from "@/types/Simulation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface Props {
  simulation: SimulationResult;
}

export default function SimulationDashboard({ simulation }: Props) {
  const [currentTickIndex, setCurrentTickIndex] = useState(0);

  const tick = simulation.timeline[currentTickIndex];

  const chartData = useMemo(() => {
    const times = simulation.timeline.map((t) => t.time);

    const avgLatency = simulation.timeline.map((t) =>
      average(t.components.map((c) => c.latencyMs))
    );

    const avgSaturation = simulation.timeline.map((t) =>
      average(t.components.map((c) => c.saturation))
    );

    const avgErrorRate = simulation.timeline.map((t) =>
      average(t.components.map((c) => c.errorRate))
    );

    const avgRps = simulation.timeline.map((t) =>
      average(t.components.map((c) => c.rps))
    );

    return {
      labels: times,
      datasets: [
        {
          label: "Latency (ms)",
          data: avgLatency,
          borderColor: "#7B61FF",
          backgroundColor: "rgba(123,97,255,0.2)",
        },
        {
          label: "Saturation",
          data: avgSaturation,
          borderColor: "#FF8A00",
          backgroundColor: "rgba(255,138,0,0.2)",
        },
        {
          label: "Error Rate",
          data: avgErrorRate,
          borderColor: "#FF3B30",
          backgroundColor: "rgba(255,59,48,0.2)",
        },
        {
          label: "RPS",
          data: avgRps,
          borderColor: "#34C759",
          backgroundColor: "rgba(52,199,89,0.2)",
        },
      ],
    };
  }, [simulation]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Simulation Dashboard — {simulation.architectureId}
        </h2>
        <div className="text-sm text-gray-500">
          Duration: {simulation.config.durationSeconds}s • Base RPS:{" "}
          {simulation.config.baseRps}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={chartData} />
      </div>

      {/* Tick Scrubber */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="font-semibold">Timeline</label>
        <input
          type="range"
          min={0}
          max={simulation.timeline.length - 1}
          value={currentTickIndex}
          onChange={(e) => setCurrentTickIndex(Number(e.target.value))}
          className="w-full mt-2"
        />
        <div className="text-sm text-gray-600 mt-1">
          Tick {currentTickIndex} / {simulation.timeline.length - 1}
        </div>
      </div>

      {/* Component Metrics Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">
          Component Metrics @ Tick {tick.time}
        </h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Component</th>
              <th className="text-left p-2">RPS</th>
              <th className="text-left p-2">Saturation</th>
              <th className="text-left p-2">Latency (ms)</th>
              <th className="text-left p-2">Error Rate</th>
            </tr>
          </thead>
          <tbody>
            {tick.components.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.rps.toFixed(1)}</td>
                <td className="p-2">{(c.saturation * 100).toFixed(1)}%</td>
                <td className="p-2">{c.latencyMs.toFixed(1)}</td>
                <td className="p-2">{(c.errorRate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chaos Event Indicators */}
      {simulation.config.enableJitter && (
        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <strong>Jitter Enabled:</strong> Traffic fluctuates ±
          {simulation.config.jitterAmplitudeRps} RPS every{" "}
          {simulation.config.jitterPeriodSeconds}s.
        </div>
      )}
    </div>
  );
}

function average(arr: number[]) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
