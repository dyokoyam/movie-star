import Link from "next/link";

import { siteConfig } from "@/app/_config/site";
import { MovieCard } from "@/app/_components/movie-card";
import { getMovies } from "@/app/_data/get-movies";

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 md:px-10">
      <header className="flex flex-col gap-6 text-center md:text-left">
        <span className="inline-flex items-center gap-2 self-center rounded-full border border-border bg-slate-900/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-300 md:self-start">
          Movie Star
        </span>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight text-slate-50 md:mx-0 md:text-5xl">
          Launch a cinematic experience with a production-ready Next.js and Gin
          stack.
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-base text-slate-300 md:mx-0 md:text-lg">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition-transform hover:-translate-y-0.5"
          >
            Read the docs
          </Link>
          <Link
            href="/api-reference"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent"
          >
            Explore the API
          </Link>
        </div>
      </header>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-slate-100">
            Featured titles
          </h2>
          <span className="text-sm text-slate-400">
            Powered by{" "}
            <span className="font-mono font-medium text-slate-200">
              {process.env.NEXT_PUBLIC_API_BASE_URL}
            </span>
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {movies.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-slate-900/40 p-6 text-center text-sm text-slate-400">
            No movies available yet. Seed some data in PostgreSQL or adjust the
            fallback dataset in <code>src/app/_data/get-movies.ts</code>.
          </p>
        ) : null}
      </section>
    </main>
  );
}
