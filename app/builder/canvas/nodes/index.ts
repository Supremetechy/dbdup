// app/builder/canvas/nodes/index.ts

import LoadBalancerNode from "./LoadBalancerNode";
import DatabaseNode from "./DatabaseNode";
import CacheNode from "./CacheNode";
import MicroserviceNode from "./MicroserviceNode";
import QueueNode from "./QueueNode";
import AIModelNode from "./AIModelNode";

export const nodeTypes = {
  loadBalancer: LoadBalancerNode,
  database: DatabaseNode,
  cache: CacheNode,
  microservice: MicroserviceNode,
  queue: QueueNode,
  aiModel: AIModelNode,
};
