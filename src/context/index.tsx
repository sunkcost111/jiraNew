import React from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  //整个项目的<App/>
  return <AuthProvider>{children}</AuthProvider>;
};
