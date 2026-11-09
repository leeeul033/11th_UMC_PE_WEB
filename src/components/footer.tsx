export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex min-h-[57px] max-w-[1440px] flex-wrap items-center justify-end gap-2 px-5 py-4 md:px-10 xl:px-20">
        <img
          src="/images/logos/tmdb-logo.svg"
          alt="TMDB"
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
        />

        <p className="text-xs leading-[14px] text-[#606774]">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}