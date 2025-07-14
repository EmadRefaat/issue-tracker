import StatusBadge from "@/app/components/StatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid columns={{ xs: "1", sm: "2" }} gap="4">
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap="2" my="2">
          <StatusBadge status={issue.status}></StatusBadge>
          <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Updatte issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
