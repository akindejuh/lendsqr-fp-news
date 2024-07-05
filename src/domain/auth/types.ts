// Requests
export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface RegisterUserRequest {
  email: string;
  fullName: string;
  phoneNumber: string;
}

// Response
export interface AuthResponse
  extends ServerResponse<{
    user_id: string;
    token: string;
  }> {}
