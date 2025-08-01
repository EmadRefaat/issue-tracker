"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { set } from "lodash";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";

const AssgineeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fechusers = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data.users);
    };
    fechusers();
  }, []);
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
