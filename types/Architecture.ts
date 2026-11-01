// types/Architecture.ts

export type ArchitectureComponentKind =
  | "LOAD_BALANCER"
  | "API_GATEWAY"
  | "WEB_APP"
  | "MICROSERVICE"
  | "DATABASE"
  | "CACHE"
  | "QUEUE"
  | "STORAGE"
  | "CDN"
  | "AUTH_PROVIDER"
  | "AI_MODEL"
  | "MONITORING"
  | "OTHER";

export interface ArchitectureComponent {
  id: string;
  name: string;
  kind: ArchitectureComponentKind;

  // Optional metadata for simulation
  capacityRps?: number;      // baseline capacity
  baseLatencyMs?: number;    // baseline latency

  // Chaos modifiers (used by chaos engine)
  isCrashed?: boolean;
  capacityMultiplier?: number;
  latencySpikeMultiplier?: number;

  // Optional tags / notes
  tags?: string[];
  description?: string;
}

export interface ArchitectureConnection {
  id: string;
  sourceId: string;
  targetId: string;

  // Optional metadata
  protocol?: "HTTP" | "HTTPS" | "GRPC" | "TCP" | "UDP" | "MESSAGE" | "OTHER";
  description?: string;

  // Chaos flag
  isDisabled?: boolean;
}

export type ArchitecturePatternType =
  | "MONOLITH"
  | "MICROSERVICES"
  | "EVENT_DRIVEN"
  | "AI_PIPELINE"
  | "API_GATEWAY"
  | "UNKNOWN";

export interface ArchitecturePattern {
  type: ArchitecturePatternType;
  description: string;
}

export interface ArchitectureExplanation {
  id: string;
  name: string;
  patterns: ArchitecturePattern[];
  summary: string;
  flows: string[];
  risks: string[];
  improvements: string[];
}

export interface Architecture {
  id: string;
  name: string;
  components: ArchitectureComponent[];
  connections: ArchitectureConnection[];

  // Optional: saved explanation snapshot
  explanation?: ArchitectureExplanation;

  // Optional: tags / owner / metadata
  tags?: string[];
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}
