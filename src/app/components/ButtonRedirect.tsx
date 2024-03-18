"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonRedirect = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  return <button onClick={handleRedirect}>Redirect to login page</button>;
};

export default ButtonRedirect;
