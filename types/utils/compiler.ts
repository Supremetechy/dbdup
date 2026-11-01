// app/builder/utils/compiler.ts

import {
  Architecture,
  ArchitectureComponent,
  ArchitectureConnection,
  ArchitectureExplanation,
  ArchitecturePattern,
} from "@/types/Architecture";

type ComponentKind =
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
  | "MONITORING";

interface CompilerContext {
  components: ArchitectureComponent[];
  connections: ArchitectureConnection[];
}

export function compileArchitecture(architecture: Architecture): ArchitectureExplanation {
  const ctx: CompilerContext = {
    components: architecture.components,
    connections: architecture.connections,
  };

  const patterns = detectPatterns(ctx);
  const summary = generateSummary(ctx, patterns);
  const flows = generateFlows(ctx, patterns);
  const risks = generateRisks(ctx, patterns);
  const improvements = generateImprovements(ctx, patterns);

  return {
    id: architecture.id,
    name: architecture.name,
    patterns,
    summary,
    flows,
    risks,
    improvements,
  };
}

// ---------------------- Pattern detection ----------------------

function detectPatterns(ctx: CompilerContext): ArchitecturePattern[] {
  const { components, connections } = ctx;

  const hasMicroservices =
    components.filter(c => c.kind === "MICROSERVICE").length >= 3;

  const hasMonolith =
    components.some(c => c.kind === "WEB_APP");

  const hasQueue =
    components.some(c => c.kind === "QUEUE");

  const hasAI =
    components.some(c => c.kind === "AI_MODEL");

  const hasApiGateway =
    components.some(c => c.kind === "API_GATEWAY");

  const patterns: ArchitecturePattern[] = [];

  if (hasMonolith && !hasMicroservices) {
    patterns.push({
      type: "MONOLITH",
      description: "Single application handling most responsibilities with a shared database and cache.",
    });
  }

  if (hasMicroservices) {
    patterns.push({
      type: "MICROSERVICES",
      description: "Multiple services with separated responsibilities and likely independent data stores.",
    });
  }

  if (hasQueue) {
    patterns.push({
      type: "EVENT_DRIVEN",
      description: "Message queues or streams indicate asynchronous, event-driven communication.",
    });
  }

  if (hasAI) {
    patterns.push({
      type: "AI_PIPELINE",
      description: "AI model components suggest inference or ML workflows integrated into the system.",
    });
  }

  if (hasApiGateway) {
    patterns.push({
      type: "API_GATEWAY",
      description: "Central gateway routing requests to downstream services.",
    });
  }

  if (patterns.length === 0) {
    patterns.push({
      type: "UNKNOWN",
      description: "No clear high-level pattern detected. This may be a custom or incomplete architecture.",
    });
  }

  return patterns;
}

// ---------------------- Summary generation ----------------------

function generateSummary(ctx: CompilerContext, patterns: ArchitecturePattern[]): string {
  const { components } = ctx;

  const dbs = components.filter(c => c.kind === "DATABASE");
  const caches = components.filter(c => c.kind === "CACHE");
  const queues = components.filter(c => c.kind === "QUEUE");
  const aiModels = components.filter(c => c.kind === "AI_MODEL");
  const storages = components.filter(c => c.kind === "STORAGE");
  const loadBalancers = components.filter(c => c.kind === "LOAD_BALANCER");
  const apiGateways = components.filter(c => c.kind === "API_GATEWAY");

  const patternNames = patterns.map(p => p.type).join(", ");

  const lines: string[] = [];

  lines.push(`This architecture primarily follows: ${patternNames}.`);

  if (loadBalancers.length > 0) {
    lines.push(`Incoming traffic is routed through ${loadBalancers.length} load balancer(s), providing distribution and basic high availability.`);
  }

  if (apiGateways.length > 0) {
    lines.push(`An API gateway is used as a single entry point, handling routing, authentication, and request shaping for downstream services.`);
  }

  if (dbs.length > 0) {
    lines.push(`There are ${dbs.length} database(s) in this design, suggesting ${dbs.length > 1 ? "data separation per domain or service" : "a single source of truth"} for persistent state.`);
  }

  if (caches.length > 0) {
    lines.push(`Caching is implemented via ${caches.length} cache component(s), likely improving read performance and reducing database load.`);
  }

  if (queues.length > 0) {
    lines.push(`Message queues or streams are present, enabling asynchronous processing and decoupling between producers and consumers.`);
  }

  if (storages.length > 0) {
    lines.push(`Object or file storage is included, suitable for handling user uploads, static assets, or large binary data.`);
  }

  if (aiModels.length > 0) {
    lines.push(`AI model components indicate that inference or ML-based decision-making is part of the request flow or background processing.`);
  }

  return lines.join(" ");
}

// ---------------------- Flow generation ----------------------

function generateFlows(ctx: CompilerContext, patterns: ArchitecturePattern[]): string[] {
  const { components, connections } = ctx;

  const flows: string[] = [];

  // Example: user request flow
  const loadBalancer = components.find(c => c.kind === "LOAD_BALANCER");
  const apiGateway = components.find(c => c.kind === "API_GATEWAY");
  const webApp = components.find(c => c.kind === "WEB_APP");
  const microservices = components.filter(c => c.kind === "MICROSERVICE");
  const dbs = components.filter(c => c.kind === "DATABASE");
  const caches = components.filter(c => c.kind === "CACHE");

  if (loadBalancer && (apiGateway || webApp)) {
    flows.push(
      "User requests enter through the load balancer, which distributes traffic across available application or gateway instances."
    );
  }

  if (apiGateway && microservices.length > 0) {
    flows.push(
      "The API gateway routes incoming requests to specific microservices based on path, method, or routing rules."
    );
  }

  if (webApp && dbs.length > 0) {
    flows.push(
      "The web application handles business logic and interacts directly with the primary database for reads and writes."
    );
  }

  if (microservices.length > 0 && dbs.length > 0) {
    flows.push(
      "Each microservice typically owns its own data store, interacting with its database for domain-specific persistence."
    );
  }

  if (caches.length > 0) {
    flows.push(
      "Cache components sit between application logic and databases, serving frequently accessed data and reducing latency."
    );
  }

  // Event-driven flow
  const queues = components.filter(c => c.kind === "QUEUE");
  if (queues.length > 0) {
    flows.push(
      "Producers publish events or messages to queues/streams, which are then consumed by background workers or downstream services."
    );
  }

  // AI flow
  const aiModels = components.filter(c => c.kind === "AI_MODEL");
  if (aiModels.length > 0) {
    flows.push(
      "Requests or events may be enriched or processed by AI model components, providing predictions, recommendations, or classifications."
    );
  }

  if (flows.length === 0) {
    flows.push("No clear end-to-end flow could be inferred. The architecture may be incomplete or missing key connections.");
  }

  return flows;
}

// ---------------------- Risk analysis ----------------------

function generateRisks(ctx: CompilerContext, patterns: ArchitecturePattern[]): string[] {
  const { components } = ctx;
  const risks: string[] = [];

  const dbs = components.filter(c => c.kind === "DATABASE");
  const caches = components.filter(c => c.kind === "CACHE");
  const queues = components.filter(c => c.kind === "QUEUE");
  const aiModels = components.filter(c => c.kind === "AI_MODEL");
  const loadBalancers = components.filter(c => c.kind === "LOAD_BALANCER");

  if (dbs.length === 1) {
    risks.push(
      "Single database instance may become a performance bottleneck and a single point of failure if not replicated or clustered."
    );
  }

  if (dbs.length > 1 && patterns.some(p => p.type === "MONOLITH")) {
    risks.push(
      "Multiple databases in a mostly monolithic architecture can introduce data consistency challenges and complex transaction boundaries."
    );
  }

  if (caches.length === 0) {
    risks.push(
      "Lack of caching may lead to higher latency and increased load on the primary data stores under heavy traffic."
    );
  }

  if (queues.length > 0 && !patterns.some(p => p.type === "EVENT_DRIVEN")) {
    risks.push(
      "Queues are present but the architecture does not clearly follow event-driven patterns, which may lead to underutilized or misconfigured messaging."
    );
  }

  if (aiModels.length > 0) {
    risks.push(
      "AI components introduce additional operational complexity, including model versioning, performance tuning, and potential bias or reliability issues."
    );
  }

  if (loadBalancers.length === 0) {
    risks.push(
      "No load balancer detected; scaling horizontally or handling failover may be difficult for public-facing workloads."
    );
  }

  if (risks.length === 0) {
    risks.push("No major risks detected based on current components; detailed review of non-functional requirements is still recommended.");
  }

  return risks;
}

// ---------------------- Improvement suggestions ----------------------

function generateImprovements(ctx: CompilerContext, patterns: ArchitecturePattern[]): string[] {
  const { components } = ctx;
  const improvements: string[] = [];

  const dbs = components.filter(c => c.kind === "DATABASE");
  const caches = components.filter(c => c.kind === "CACHE");
  const queues = components.filter(c => c.kind === "QUEUE");
  const storages = components.filter(c => c.kind === "STORAGE");
  const monitoring = components.filter(c => c.kind === "MONITORING");

  if (dbs.length === 1) {
    improvements.push(
      "Consider adding read replicas or clustering for the primary database to improve availability and read scalability."
    );
  }

  if (caches.length === 0 && dbs.length > 0) {
    improvements.push(
      "Introduce a cache layer (e.g., Redis) for frequently accessed data to reduce latency and database load."
    );
  }

  if (queues.length === 0 && patterns.some(p => p.type === "MICROSERVICES")) {
    improvements.push(
      "Add message queues or streams between microservices to decouple communication and enable more resilient, event-driven workflows."
    );
  }

  if (storages.length === 0) {
    improvements.push(
      "Include dedicated object storage (e.g., S3) for user uploads, logs, and large binary assets instead of storing them directly in the database."
    );
  }

  if (monitoring.length === 0) {
    improvements.push(
      "Add monitoring and observability components (metrics, logs, traces) to gain visibility into performance and failures."
    );
  }

  if (improvements.length === 0) {
    improvements.push("Architecture appears well-balanced; further improvements may focus on cost optimization, security hardening, and resilience testing.");
  }

  return improvements;
}
