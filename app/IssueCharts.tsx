"use client";
import { Card } from "@radix-ui/themes";
import { fill, filter } from "lodash";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            style={{ fill: "var(--accent-a9)" }}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
