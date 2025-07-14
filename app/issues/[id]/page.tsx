import StatusBadge from "@/app/components/StatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditIssueButtons from "./EditIssueButtons";
import IssueDetail from "./IssueDetail";
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
        <IssueDetail issue={issue}></IssueDetail>
      </Box>
      <Box>
        <EditIssueButtons issueId={issue.id}></EditIssueButtons>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
