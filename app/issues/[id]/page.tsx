import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params: { id } }: props) => {
  if (typeof id !== "number") return notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!issue) return notFound();
  return (
    <div>
      <p>{issue?.title}</p>
      <p>{issue?.status}</p>
      <p>{issue?.description}</p>
      <p>{issue?.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailsPage;
