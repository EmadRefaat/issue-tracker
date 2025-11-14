import { status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "open", color: "red" },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "closed", color: "green" },
};

const StatusBadge = ({ status }: { status: status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
