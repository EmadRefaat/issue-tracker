import { prisma } from "@/prisma/client";
import { Table, TableCell, TableRow } from "@radix-ui/themes";
import React from "react";
import StatusBadge from "../components/StatusBadge";
import IssueToolbar from "./IssueToolbar";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import Link from "../components/Link";
import { orderBy } from "lodash";
import { ArrowUpIcon, UploadIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: "hidden md:table-cell";
}[] = [
  { label: "issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

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

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
      <IssueToolbar></IssueToolbar>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                className={column.className}
                key={column.value}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <StatusBadge status={issue.status}></StatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status}></StatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        itemCount={issuesCount}
        currentPage={page}
      ></Pagination>
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
