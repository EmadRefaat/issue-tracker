"use client";
import { Button, TextField, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface formvalues {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<formvalues>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);

        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextFieldInput
          placeholder="title"
          {...register("title")}
        ></TextFieldInput>
      </TextField.Root>
      <Controller<formvalues>
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="description" />
        )}
      />

      <Button>submit nex issue </Button>
    </form>
  );
};

export default NewIssue;
