import RegisterForm from "@/app/(auth)/register/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <main className="pt-24 h-screen">
      <div className="container mx-auto px-5 h-full flex items-center justify-center flex-col">
        <h1 className="text-4xl font-semibold text-center capitalize">
          Đăng ký
        </h1>
        <div className="w-full md:max-w-[600px]">
          <RegisterForm />
          <Link
            href="/login"
            className="block mt-3 text-sm text-right text-blue-400"
          >
            Bạn đã có tài khoản ?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
