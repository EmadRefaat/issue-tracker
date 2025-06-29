"use client";
import { Button, TextArea, TextField, TextFieldInput } from "@radix-ui/themes";
import React from "react";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextFieldInput placeholder="title"></TextFieldInput>
      </TextField.Root>
      <TextArea placeholder="description" />
      <Button>submit nex issue </Button>
    </div>
  );
};

export default NewIssue;
