"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import toast, { Toaster } from "react-hot-toast";
const fetchUsers = async () => {
  const { data } = await axios.get("/api/users");
  return Array.isArray(data) ? data : data.users ?? [];
};

interface props {
  issue: Issue;
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 60 * 1000,
    retry: 3,
  });
const AssgineeSelect = ({ issue }: props) => {
  const assignUser = (userId: string) => {
    return axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch((err) => {
        toast.error("changes could not be saved");
      });
  };

  const { data: users = [], isLoading, error } = useUsers();
  if (isLoading) return <Skeleton></Skeleton>;
  if (error) return null;
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => assignUser(userId)}
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
