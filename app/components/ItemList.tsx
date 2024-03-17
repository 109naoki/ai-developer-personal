// components/ItemsList.tsx
import { useItems } from "@/hooks/post";
import React, { useState } from "react";

const ItemsList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const {
    data: items,
    error,
    isLoading,
  } = useItems({ page, sortBy, sortOrder });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {items.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage((old) => old - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((old) => old + 1)}>Next</button>
      {/* ソートオプションのボタンやセレクトボックスを追加する場合はここに配置 */}
    </div>
  );
};

export default ItemsList;
