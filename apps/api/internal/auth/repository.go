package auth

type Repository interface {
	CurrentProfile() Profile
}

type inMemoryRepository struct{}

func NewRepository() Repository {
	return &inMemoryRepository{}
}

func (r *inMemoryRepository) CurrentProfile() Profile {
	return Profile{
		ID:    "demo-user",
		Email: "demo@example.com",
	}
}
