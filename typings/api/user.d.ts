interface LoginRequest {
  identifier: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
  user: User;
}
