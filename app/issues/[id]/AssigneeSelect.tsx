"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import { Issue } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";
const fetchUsers = async () => {
  const { data } = await axios.get("/api/users");
  return Array.isArray(data) ? data : data.users ?? [];
};

interface props {
  issue: Issue;
}
const AssgineeSelect = ({ issue }: props) => {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton></Skeleton>;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) =>
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId || null,
            })
            .catch((err) => {
              toast.error("changes could not be saved");
            })
        }
      >
        <Select.Trigger placeholder="Assignee" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster position="top-center" />
    </>
  );
};

export default AssgineeSelect;
