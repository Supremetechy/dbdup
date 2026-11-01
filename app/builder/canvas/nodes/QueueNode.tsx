// app/builder/canvas/nodes/QueueNode.tsx

import BaseNode from "./BaseNode";
import { RiStackLine } from "react-icons/ri";

export default function QueueNode() {
  return (
    <BaseNode
      title="Queue"
      icon={<RiStackLine />}
      color="#FF3B30"
    />
  );
}
