import "server-only";

import type { Movie } from "../_types/movie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

const FALLBACK_MOVIES: Movie[] = [
  {
    id: "tt0133093",
    title: "The Matrix",
    synopsis:
      "A hacker learns about the true nature of reality and his role in the fight against its controllers.",
    releaseDate: "1999-03-31",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/aJj2bQVFGGwpYE6Rbg06vF5gRUD.jpg",
  },
  {
    id: "tt4154796",
    title: "Avengers: Endgame",
    synopsis:
      "Earth's mightiest heroes assemble once more in a final stand against Thanos.",
    releaseDate: "2019-04-26",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: "tt0468569",
    title: "The Dark Knight",
    synopsis:
      "Batman faces his ultimate psychological test against the Joker's chaotic plans for Gotham.",
    releaseDate: "2008-07-18",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
];

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: {
        tags: ["movies"],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const payload = (await response.json()) as {
      data?: Movie[];
    };

    if (!payload?.data?.length) {
      return FALLBACK_MOVIES;
    }

    return payload.data.map((movie) => ({
      ...movie,
      releaseDate: movie.releaseDate,
    }));
  } catch (error) {
    console.warn("Using fallback movies due to API error:", error);
    return FALLBACK_MOVIES;
  }
}
