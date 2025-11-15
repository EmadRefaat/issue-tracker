import StatusBadge from "@/app/components/StatusBadge";
import { issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="2" my="2">
        <StatusBadge status={issue.status}></StatusBadge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetail;
