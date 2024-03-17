"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserData, userSchema } from "@/app/schemas/userSchema";
import { useUpdateUser } from "@/hooks/user";
import toast from "react-hot-toast";

const UpdateUserForm = ({ userId }: { userId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });
  const { mutate: updateUser } = useUpdateUser();

  const onSubmit = (data: UserData) => {
    updateUser(
      { userId, ...data },
      {
        onSuccess: () => {
          toast.success("User updated successfully");
        },
        onError: (error) => {
          toast.error(
            `Update failed: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
