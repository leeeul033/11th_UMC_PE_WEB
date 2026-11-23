"use client";

import { ProfileEditPage } from "../../screens/profile-edit-page";
import RequireAuth from "../../components/auth/require-auth";

export default function ProfileEditRoutePage() {
  return (
    <RequireAuth>
      <ProfileEditPage />
    </RequireAuth>
  );
}
