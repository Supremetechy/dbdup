function applyChaos(ctx: RuntimeContext, time: number) {
  const { chaosEvents, components, connections, config } = ctx;

  const activeEvents = chaosEvents.filter(
    (e) => time >= e.startTime && time <= e.endTime
  );

  for (const event of activeEvents) {
    switch (event.type) {
      case "NODE_CRASH": {
        const target = components.find(
          (c) => c.component.id === event.componentId
        );
        if (target) {
          target.metrics.rps = 0;
          target.metrics.saturation = 0;
          target.metrics.latencyMs = Infinity;
          target.metrics.errorRate = 1;
          target.component.isCrashed = true;
        }
        break;
      }

      case "LATENCY_SPIKE": {
        const target = components.find(
          (c) => c.component.id === event.componentId
        );
        if (target) {
          target.component.latencySpikeMultiplier =
            event.latencyMultiplier ?? 3;
        }
        break;
      }

      case "CAPACITY_DROP": {
        const target = components.find(
          (c) => c.component.id === event.componentId
        );
        if (target) {
          target.component.capacityMultiplier =
            event.capacityMultiplier ?? 0.3;
        }
        break;
      }

      case "CONNECTION_CUT": {
        const conn = connections.find(
          (c) => c.id === event.connectionId
        );
        if (conn) {
          conn.isDisabled = true;
        }
        break;
      }

      case "TRAFFIC_SURGE": {
        ctx.config.baseRps += event.surgeRps ?? 500;
        break;
      }
    }
  }
}
