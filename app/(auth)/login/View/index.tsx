"use client";
import { FC, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export const View: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    toast.error("メールアドレスかパスワードが正しくありません");
    setLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12 lg:px-20">
      <div className="mx-auto my-6 flex w-full max-w-md flex-col rounded-lg border p-10 md:mt-0">
        <div className="mt-8">
          <h1 className="text-center text-lg">ログイン</h1>
          <div className="mt-6">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div className="relative mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span>
                    <EmailIcon />
                  </span>
                </div>
              </div>

              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワード"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <span>
                      <LockIcon />
                    </span>
                  ) : (
                    <span>
                      <VisibilityIcon />
                    </span>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mx-auto mt-4 block h-10 w-full rounded bg-bgRegister px-5 text-center text-textWhite"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    "ログイン"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-2">
              <div>
                <Link href="/register" className="font-medium">
                  新規登録
                </Link>
              </div>
              <div>
                <Link href="/register" className="font-medium">
                  パスワードを忘れた場合
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
