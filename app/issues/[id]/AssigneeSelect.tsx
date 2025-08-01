"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssgineeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="mosh">mosh</Select.Item>
          <Select.Item value="emad">emad</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssgineeSelect;
