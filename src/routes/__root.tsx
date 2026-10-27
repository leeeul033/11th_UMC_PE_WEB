import { createRootRoute, Outlet } from "@tanstack/react-router";
import Footer from "../components/footer";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
  notFoundComponent: () => <main className="p-4">페이지를 찾을 수 없어요.</main>,
});