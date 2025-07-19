"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { ValidationSchema } from "@/app/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Text, TextField, TextFieldInput } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type FormValues = z.infer<typeof ValidationSchema>;

interface props {
  issue?: Issue | null;
}
const IssueForm = ({ issue }: props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(ValidationSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);

        router.push("/issues");
        router.refresh();
      }
    } catch (error) {
      setError("unexpected error occurred");
    }
    setLoading(false);
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Text color="red" className="mb-3 block">
          {error}
        </Text>
      )}

      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextFieldInput
            placeholder="title"
            {...register("title")}
            defaultValue={issue?.title}
          ></TextFieldInput>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller<FormValues>
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading}>
          {issue ? "Update issue" : "submit issue"}{" "}
          {loading && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
