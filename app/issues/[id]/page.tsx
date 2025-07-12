import StatusBadge from "@/app/components/StatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
interface props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params: { id } }: props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) return notFound();
  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap="2" my="2">
        <StatusBadge status={issue.status}></StatusBadge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
