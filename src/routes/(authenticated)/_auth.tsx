import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export const Route = createFileRoute("/(authenticated)/_auth")({
  beforeLoad: () => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
