import { Toaster } from "react-hot-toast";
import "../globals.css";
import Providers from "../lib/providers";
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
              {children}
            </Providers>
          </SessionProvider>
        </>
      </body>
    </html>
  );
}
