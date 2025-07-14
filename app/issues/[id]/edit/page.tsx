import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";

interface props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  return (
    <>
      <IssueForm issue={issue}></IssueForm>
    </>
  );
};

export default EditIssuePage;
