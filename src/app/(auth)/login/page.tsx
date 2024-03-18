import LoginForm from "@/app/(auth)/login/login-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <main className="pt-24 h-screen">
      <div className="container mx-auto px-5 h-full flex items-center justify-center flex-col">
        <h1 className="text-4xl font-semibold text-center capitalize">
          Đăng nhập
        </h1>
        <div className="w-full md:max-w-[600px]">
          <LoginForm />
          <Link
            href="/register"
            className="block mt-3 text-sm text-right text-blue-400"
          >
            Bạn chưa có tài khoản ?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
