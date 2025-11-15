import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusBadge from "../components/StatusBadge";
import { issue, status } from "@prisma/client";
import NextLink from "next/link";

export interface IssueQuery {
  status: status;
  orderBy: keyof issue;
  page: string;
}
interface props {
  searchParams: IssueQuery;
  issues: issue[];
}

const IssueTable = ({ searchParams, issues }: props) => {
  return (
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
  );
};

const columns: {
  label: string;
  value: keyof issue;
  className?: "hidden md:table-cell";
}[] = [
  { label: "issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const issuesValues = columns.map((column) => column.value);

export default IssueTable;
