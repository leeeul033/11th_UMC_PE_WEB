"use client";

import { LoginPage } from "../../screens/auth/login-page";
import RedirectIfAuthenticated from "../../components/auth/redirect-if-authenticated";

export default function LoginRoutePage() {
  return (
    <RedirectIfAuthenticated>
      <LoginPage />
    </RedirectIfAuthenticated>
  );
}
