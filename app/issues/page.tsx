import { prisma } from "@/prisma/client";
import { Flex, Table, TableCell, TableRow } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../components/StatusBadge";
import IssueToolbar from "./IssueToolbar";
import { Status } from "@prisma/client";
import Link from "../components/Link";
import { orderBy } from "lodash";
import { ArrowUpIcon, UploadIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, issuesValues } from "./IssueTable";
import { Metadata } from "next";

interface props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = issuesValues.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issuesCount = await prisma.issue.count({
    where,
  });

  return (
    <>
      <Flex direction="column" gap="4">
        <IssueToolbar></IssueToolbar>
        <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
        <Pagination
          pageSize={pageSize}
          itemCount={issuesCount}
          currentPage={page}
        ></Pagination>
      </Flex>
    </>
  );
};

export const metadata: Metadata = {
  title: "issue tracker - issues list",
  description: "issue tracker issues list",
};

export const dynamic = "force-dynamic";
export default IssuesPage;
