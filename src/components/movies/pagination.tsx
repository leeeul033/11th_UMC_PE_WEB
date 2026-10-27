export default function Pagination() {
  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button type="button" aria-label="이전 페이지" disabled>
        ‹
      </button>
      <button type="button" aria-current="page">
        1
      </button>
      <button type="button" aria-label="다음 페이지" disabled>
        ›
      </button>
    </nav>
  );
}