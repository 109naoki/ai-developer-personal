import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

interface ItemsQueryParams {
  page: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const useItems = ({ page, sortBy, sortOrder }: ItemsQueryParams) => {
  return useQuery({
    queryKey: ["items", page, sortBy, sortOrder],
    queryFn: () => fetcher("/api/items", { page, sortBy, sortOrder }),
  });
};
