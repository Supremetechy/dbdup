// app/builder/utils/simulator.ts

import {
  Architecture,
  ArchitectureComponent,
  ArchitectureConnection,
} from "@/types/Architecture";
import { SimulationConfig, SimulationResult, ComponentMetrics } from "@/types/Simulation";

interface RuntimeComponentState {
  component: ArchitectureComponent;
  metrics: ComponentMetrics;
}

interface RuntimeContext {
  components: RuntimeComponentState[];
  connections: ArchitectureConnection[];
  config: SimulationConfig;
}

// ---------------------- Public API ----------------------

export function runSimulation(
  architecture: Architecture,
  config: SimulationConfig
): SimulationResult {
  const ctx: RuntimeContext = {
    components: architecture.components.map((c) => ({
      component: c,
      metrics: {
        id: c.id,
        name: c.name,
        kind: c.kind,
        rps: 0,
        saturation: 0,
        latencyMs: 0,
        errorRate: 0,
      },
    })),
    connections: architecture.connections,
    config,
  };

  const timeline: SimulationResult["timeline"] = [];

  for (let t = 0; t < config.durationSeconds; t++) {
    stepSimulation(ctx, t);
    timeline.push({
      time: t,
      components: ctx.components.map((c) => ({ ...c.metrics })),
    });
  }

  return {
    architectureId: architecture.id,
    config,
    timeline,
  };
}

// ---------------------- Core simulation step ----------------------

function stepSimulation(ctx: RuntimeContext, time: number) {
  const { components, connections, config } = ctx;

  // 1. Reset metrics for this tick
  for (const c of components) {
    c.metrics.rps = 0;
    c.metrics.saturation = 0;
    c.metrics.latencyMs = 0;
    c.metrics.errorRate = 0;
  }

  // 2. Inject traffic at entry point(s)
  const entryComponents = findEntryComponents(components, connections);
  const totalRps = config.baseRps + trafficJitter(config, time);

  const rpsPerEntry =
    entryComponents.length > 0 ? totalRps / entryComponents.length : totalRps;

  for (const entry of entryComponents) {
    propagateTraffic(ctx, entry.component.id, rpsPerEntry);
  }

  // 3. Compute metrics per component
  for (const c of components) {
    const capacity = c.component.capacityRps ?? config.defaultCapacityRps;
    const baseLatency = c.component.baseLatencyMs ?? config.defaultLatencyMs;

    const saturation = capacity > 0 ? c.metrics.rps / capacity : 0;

    // Latency grows non-linearly near saturation
    const latencyMultiplier = 1 + Math.max(0, saturation - 0.7) * 3;
    const latencyMs = baseLatency * latencyMultiplier;

    // Error rate appears once saturation > 1.0
    const errorRate =
      saturation <= 1 ? 0 : Math.min(1, (saturation - 1) * 0.5);

    c.metrics.saturation = saturation;
    c.metrics.latencyMs = latencyMs;
    c.metrics.errorRate = errorRate;
  }
}

// ---------------------- Traffic propagation ----------------------

function propagateTraffic(
  ctx: RuntimeContext,
  componentId: string,
  incomingRps: number
) {
  const { components, connections } = ctx;

  const state = components.find((c) => c.component.id === componentId);
  if (!state) return;

  // Add incoming traffic
  state.metrics.rps += incomingRps;

  // Find downstream connections
  const downstream = connections.filter(
    (conn) => conn.sourceId === componentId
  );

  if (downstream.length === 0) return;

  // Simple round-robin / equal split
  const rpsPerDownstream = incomingRps / downstream.length;

  for (const conn of downstream) {
    propagateTraffic(ctx, conn.targetId, rpsPerDownstream);
  }
}

// ---------------------- Helpers ----------------------

function findEntryComponents(
  components: RuntimeComponentState[],
  connections: ArchitectureConnection[]
): RuntimeComponentState[] {
  const targets = new Set(connections.map((c) => c.targetId));
  return components.filter((c) => !targets.has(c.component.id));
}

function trafficJitter(config: SimulationConfig, time: number): number {
  if (!config.enableJitter) return 0;
  const amplitude = config.jitterAmplitudeRps ?? 0.2 * config.baseRps;
  const period = config.jitterPeriodSeconds ?? 30;
  return Math.sin((2 * Math.PI * time) / period) * amplitude;
}
