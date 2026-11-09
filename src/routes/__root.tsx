import { createRootRoute, Outlet } from "@tanstack/react-router";
import Footer from "../components/footer";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-[#F6F7F9] text-[#17191E]">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  ),

  notFoundComponent: () => (
    <div className="p-4">페이지를 찾을 수 없어요.</div>
  ),
});