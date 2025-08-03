import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButtons from "./EditIssueButtons";
import IssueDetail from "./IssueDetail";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";
import AssgineeSelect from "./AssigneeSelect";

interface props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params: { id } }: props) => {
  const session = await getServerSession(authOption);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) return notFound();

  return (
    <Grid columns={{ xs: "1", md: "5" }} gap="4">
      <Box className="lg:col-span-4">
        <IssueDetail issue={issue}></IssueDetail>
      </Box>
      <Box className="">
        {session && (
          <Flex gap="4" direction={"column"}>
            <AssgineeSelect issue={issue}></AssgineeSelect>
            <EditIssueButtons issueId={issue.id}></EditIssueButtons>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
