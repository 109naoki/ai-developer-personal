"use client";

import React from "react";
import { useDeleteUser } from "@/hooks/user";
import toast from "react-hot-toast";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    deleteUser(userId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
      },
      onError: (error) => {
        toast.error(
          `Deletion failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      },
    });
  };

  return <button onClick={handleDelete}>Delete User</button>;
};

export default DeleteUserButton;
