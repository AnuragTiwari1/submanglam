//signUpRoutes
interface SignupFormRequest {
  fullName: string
  email: string
  password: string
}

interface SignupFormResponse {
  message?: string
  success?: string
}

interface LoginFormResponse {
  firstName: string
  token: string
  email: string
  isProfileComplete: string
}
