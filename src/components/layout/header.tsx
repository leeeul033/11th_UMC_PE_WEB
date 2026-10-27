import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="border-b bg-white px-6 py-4 shadow-sm">
      <nav className="flex items-center gap-6">
        <Link 
          to="/" 
          className="text-lg font-bold text-gray-800 hover:text-blue-600 [&.active]:text-blue-600"
        >
          영화
        </Link>
        <Link 
          to="/search" 
          className="text-lg font-bold text-gray-800 hover:text-blue-600 [&.active]:text-blue-600"
        >
          검색
        </Link>
      </nav>
    </header>
  );
}