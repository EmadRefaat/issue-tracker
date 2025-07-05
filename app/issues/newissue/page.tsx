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

type FormValues = z.infer<typeof issueSchema>;
const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(issueSchema),
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Text color="red" className="mb-3 block">
          {error}
        </Text>
      )}

      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);

            router.push("/issues");
          } catch (error) {
            setError("unexpected error occurred");
          }
        })}
      >
        <TextField.Root>
          <TextFieldInput
            placeholder="title"
            {...register("title")}
          ></TextFieldInput>
        </TextField.Root>
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}
        <Controller<FormValues>
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}
        <Button>submit nex issue </Button>
      </form>
    </div>
  );
};

export default NewIssue;
