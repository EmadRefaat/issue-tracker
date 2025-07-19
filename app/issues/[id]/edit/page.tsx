import React from "react";
import { prisma } from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});
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
