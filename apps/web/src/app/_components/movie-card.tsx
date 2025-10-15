import Image from "next/image";

import type { Movie } from "@/app/_types/movie";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-slate-900/60 shadow-xl shadow-sky-500/5 transition-transform hover:-translate-y-1 hover:border-accent hover:shadow-sky-500/20">
      <div className="relative h-72 w-full overflow-hidden bg-slate-800">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 40vw, 90vw"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">
            {movie.title}
          </h3>
          <p className="text-sm text-slate-400">
            {new Date(movie.releaseDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <p className="line-clamp-4 text-sm text-slate-300">{movie.synopsis}</p>
      </div>
    </article>
  );
}
