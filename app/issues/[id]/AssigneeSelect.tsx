"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const fetchUsers = async () => {
  const { data } = await axios.get("/api/users");
  return Array.isArray(data) ? data : data.users ?? [];
};
const AssgineeSelect = () => {
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
    <Select.Root>
      <Select.Trigger placeholder="Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssgineeSelect;
