import { Suspense } from "react";
import { SearchPage } from "../../screens/movies/search-page";

export default function SearchRoutePage() {
  return (
    <Suspense fallback={<p className="p-8 text-[#606774]">검색 화면을 준비하고 있어요.</p>}>
      <SearchPage />
    </Suspense>
  );
}
