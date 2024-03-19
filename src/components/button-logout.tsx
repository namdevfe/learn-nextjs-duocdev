"use client";

import React from "react";
import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const ButtonLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      const res = await authApiRequest.logoutFromNextClientToNextServer();
      if (res.status === 200) {
        toast({
          description: "Đăng xuất thành công!",
          duration: 3000,
        });
        router.push("/login");
      }
    } catch (error) {
      handleErrorApi({
        error,
        duration: 3000,
      });
    }
  };
  return (
    <Button size="sm" onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
};

export default ButtonLogout;
