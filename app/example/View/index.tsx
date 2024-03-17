// components/UserForm.tsx
import { UserData, userSchema } from "@/app/schemas/userSchema";
import { useCreateUser } from "@/hooks/user";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
const View = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });
  const { mutate: createUser } = useCreateUser();

  const onSubmit = (data: UserData) => {
    createUser(data, {
      onSuccess: () => {
        toast.success("User created");
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error(`Error: ${error}`);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Create User</button>
    </form>
  );
};

export default View;
