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

interface props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: "hidden md:table-cell";
}[] = [
  { label: "issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt" },
];
const IssuesPage = async ({ searchParams }: props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <>
      <IssueToolbar></IssueToolbar>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
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
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
