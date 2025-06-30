"use client";
import { Button, TextArea, TextField, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextFieldInput placeholder="title"></TextFieldInput>
      </TextField.Root>
      <SimpleMDE placeholder="description" />
      <Button>submit nex issue </Button>
    </div>
  );
};

export default NewIssue;
