import { Toaster } from "react-hot-toast";
import "../globals.css";
import Providers from "../lib/providers";
import { AdminLayout } from "./View/AdminLayout";
import SessionProvider from "../lib/sessionProvider";
export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <>
          <SessionProvider>
            <Providers>
              <Toaster />
              <AdminLayout>{children}</AdminLayout>
            </Providers>
          </SessionProvider>
        </>
      </body>
    </html>
  );
}
