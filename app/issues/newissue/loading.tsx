import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { TextField, TextFieldInput, Button, Box } from "@radix-ui/themes";
import { error } from "console";
import React from "react";
import { Controller } from "react-hook-form";
import loading from "../loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoading = () => {
  return (
    <Box className="max-w-xl ">
      <Skeleton />
      <Skeleton height={"25rem"} />
      <Skeleton width={"5rem"} height="2rem" className="mt-3" />
    </Box>
  );
};

export default NewIssueLoading;
