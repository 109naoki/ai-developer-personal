import "../globals.css";
import { AdminLayout } from "./View/AdminLayout";
export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
