package auth

type Profile struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

type Service interface {
	CurrentProfile() Profile
}

type service struct {
	repository Repository
}

func NewService(repository Repository) Service {
	return &service{repository: repository}
}

func (s *service) CurrentProfile() Profile {
	return s.repository.CurrentProfile()
}
