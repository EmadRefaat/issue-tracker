import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueCharts from "./IssueCharts";
import IssueSummary from "./IssueSummary";
import LatestIssueTable from "./LatestIssueTable";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex gap="5" direction="column">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueCharts open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssueTable />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "issue tracker - dashboard",
  description: "issue tracker dashboard",
};
