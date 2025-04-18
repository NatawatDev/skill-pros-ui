export interface LoginResponse {
  data: {
    accessToken: string
    refreshToken: string
  }
  success: boolean
  message: string
}


export interface ForgetPasswordResponse {
  success: boolean
  message: string
}


export interface ResetPasswordResponse {
  success: boolean
  message: string
}