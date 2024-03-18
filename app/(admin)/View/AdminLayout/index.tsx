import React, { FC, ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <div className="bg-green-400 w-64">nav</div>
      <div className="flex grow flex-col">
        <div className="bg-red-400">header</div>

        <div className="grow bg-pink-400">{children}</div>
        <div className="bg-orange-400">footer</div>
      </div>
    </div>
  );
};
