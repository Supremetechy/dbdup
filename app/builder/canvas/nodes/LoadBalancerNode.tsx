// app/builder/canvas/nodes/LoadBalancerNode.tsx

import BaseNode from "./BaseNode";
import { MdOutlineDns } from "react-icons/md";

export default function LoadBalancerNode() {
  return (
    <BaseNode
      title="Load Balancer"
      icon={<MdOutlineDns />}
      color="#4A90E2"
    />
  );
}
