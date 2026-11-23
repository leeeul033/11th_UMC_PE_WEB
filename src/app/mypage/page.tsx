"use client";

import { ProfilePage } from "../../screens/profile-page";
import RequireAuth from "../../components/auth/require-auth";

export default function MyPageRoutePage() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  );
}
