export type ChaosEventType =
  | "NODE_CRASH"
  | "LATENCY_SPIKE"
  | "CAPACITY_DROP"
  | "CONNECTION_CUT"
  | "TRAFFIC_SURGE";

export interface ChaosEvent {
  id: string;
  type: ChaosEventType;
  startTime: number;
  endTime: number;

  // Targets
  componentId?: string;
  connectionId?: string;

  // Parameters
  latencyMultiplier?: number;
  capacityMultiplier?: number;
  surgeRps?: number;
}
