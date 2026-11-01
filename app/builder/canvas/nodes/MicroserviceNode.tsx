// app/builder/canvas/nodes/MicroserviceNode.tsx

import BaseNode from "./BaseNode";
import { MdOutlineApps } from "react-icons/md";

export default function MicroserviceNode() {
  return (
    <BaseNode
      title="Microservice"
      icon={<MdOutlineApps />}
      color="#34C759"
    />
  );
}
