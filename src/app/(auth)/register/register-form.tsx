"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { useToast } from "@/components/ui/use-toast";
import authApiRequest from "@/apiRequest/auth";
import { clientSessionToken } from "@/lib/http";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    try {
      const res = await authApiRequest.register(values);

      if (res.status === 200) {
        // Notify
        toast({
          description: "Register Succeed!",
        });

        await authApiRequest.auth({
          sessionToken: res.payload.data.token,
        });

        router.push("/me");
      }
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];

      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: error.payload.message,
        });
      }
    }

    // const result = await fetch(
    //   `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   }
    // )
    //   .then(async (res) => {
    //     const payload = await res.json();
    //     const data = {
    //       status: res.status,
    //       payload,
    //     };

    //     if (!res.ok) {
    //       throw data;
    //     }

    //     return data;
    //   })
    //   .catch((error: any) => {
    //     const errors = error.payload.errors as {
    //       field: string;
    //       message: string;
    //     }[];

    //     const status = error.status as number;
    //     if (status === 422) {
    //       errors.forEach((error) => {
    //         form.setError(error.field as "email", {
    //           type: "server",
    //           message: error.message,
    //         });
    //       });
    //     } else {
    //       toast({
    //         variant: "destructive",
    //         title: "Lỗi",
    //         description: error.payload.message,
    //       });
    //     }
    //   });
    // console.log("🚀result---->", result);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full"
        noValidate
      >
        {/* Username field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Nhập email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm password field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full !mt-5">
          Đăng Ký
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
