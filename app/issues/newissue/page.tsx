"use client";
import { Button, TextField, Text, TextFieldInput } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type FormValues = z.infer<typeof issueSchema>;
const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(issueSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/issues", data);

      router.push("/issues");
    } catch (error) {
      setError("unexpected error occurred");
      setLoading(false);
    }
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
          ></TextFieldInput>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller<FormValues>
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading}>
          submit nex issue {loading && <Spinner></Spinner>}
        </Button>
      </form>
    </div>
  );
};

export default NewIssue;
