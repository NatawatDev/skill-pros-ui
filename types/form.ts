export interface ILoginResponse {
  data: {
    accessToken: string
    refreshToken: string
  }
  success: boolean
  message: string
}


export interface IResponse {
  success: boolean
  message: string
}
