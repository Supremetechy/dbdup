// app/builder/canvas/nodes/BaseNode.tsx

import { Handle, Position } from "reactflow";

export default function BaseNode({
  title,
  icon,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 12,
        width: 160,
        background: "#fff",
        border: `2px solid ${color}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 22 }}>{icon}</div>
        <strong>{title}</strong>
      </div>

      {/* Input */}
      <Handle type="target" position={Position.Top} />

      {/* Output */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
