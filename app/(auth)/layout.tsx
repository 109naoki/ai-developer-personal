import { Toaster } from "react-hot-toast";
import "../globals.css";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
