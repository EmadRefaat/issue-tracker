import { issue_status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: issue_status }[] = [
    { label: "opent", value: open, status: "OPEN" },
    { label: "in progress", value: closed, status: "IN_PROGRESS" },
    { label: "closed", value: inProgress, status: "CLOSED" },
  ];

  return (
    <Flex direction="row" gap="4">
      {containers.map((container) => {
        return (
          <Card key={container.label}>
            <Flex direction="column" gap="2">
              <Link href={`/issues?status=${container.status}`}>
                {container.label}
              </Link>
              <Text>{container.value}</Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
