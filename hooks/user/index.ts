import { useMutation } from "@tanstack/react-query";

import { UserData, userSchema } from "@/app/schemas/userSchema";
import { apiRequest } from "@/utils/mutate";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (newUserData: UserData) => {
      const parsedData = userSchema.parse(newUserData);
      return apiRequest<UserData, { message: string }>(
        "/users",
        "POST",
        parsedData
      );
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      return apiRequest<undefined, { message: string }>(
        `/users/${userId}`,
        "DELETE",
        undefined
      );
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      ...updateData
    }: { userId: string } & UserData) => {
      const parsedData = userSchema.parse(updateData);
      return apiRequest<UserData, { message: string }>(
        `/users/${userId}`,
        "PATCH",
        parsedData
      );
    },
  });
};
