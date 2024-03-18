"use client";
import React, { useState } from "react";
import { clientSessionToken } from "@/lib/http";

const AppProvider = ({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) => {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken;
    }
  });
  return <>{children}</>;
};

export default AppProvider;
