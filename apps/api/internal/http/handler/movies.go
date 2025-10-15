package handler

import (
	"net/http"
	"time"

	"github.com/dyokoyam/movie-star/apps/api/internal/http/middleware"
	"github.com/gin-gonic/gin"
)

// Movie represents a lightweight DTO returned by the API.
type Movie struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Synopsis    string    `json:"synopsis"`
	ReleaseDate time.Time `json:"releaseDate"`
	PosterURL   string    `json:"posterUrl"`
}

var sampleMovies = []Movie{
	{
		ID:          "tt0133093",
		Title:       "The Matrix",
		Synopsis:    "A hacker learns about the true nature of reality and his role in the fight against its controllers.",
		ReleaseDate: time.Date(1999, time.March, 31, 0, 0, 0, 0, time.UTC),
		PosterURL:   "https://image.tmdb.org/t/p/w500/aJj2bQVFGGwpYE6Rbg06vF5gRUD.jpg",
	},
	{
		ID:          "tt4154796",
		Title:       "Avengers: Endgame",
		Synopsis:    "Earth's mightiest heroes assemble once more in a final stand against Thanos.",
		ReleaseDate: time.Date(2019, time.April, 26, 0, 0, 0, 0, time.UTC),
		PosterURL:   "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
	},
	{
		ID:          "tt0468569",
		Title:       "The Dark Knight",
		Synopsis:    "Batman faces his ultimate psychological test against the Joker's chaotic plans for Gotham.",
		ReleaseDate: time.Date(2008, time.July, 18, 0, 0, 0, 0, time.UTC),
		PosterURL:   "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
	},
}

// ListMovies responds with a curated list of movies.
func ListMovies() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"data":       sampleMovies,
			"request_id": middleware.RequestIDFromContext(c),
		})
	}
}
