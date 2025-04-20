export interface ISigninAdminPayload {
  email: string,
  password: string
}

export interface IForgetPasswordAdminPayload {
  email: string,
}

export interface IResetPasswordAdminPayload {
  resetPasswordToken: string,
  password: string,
  confirmPassword: string
}

export interface ISetupPasswordAdminPayload {
  inviteToken: string,
  password: string,
  confirmPassword: string
}

export interface IInviteAdminPayload {
  email: string,
  phone: string,
  firstname: string,
  lastname: string
}

export interface IProfileData {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  createsAt: string,
  status: string,
  role: string
}

export interface IProfileAdminResponse {
  success: boolean
  message: string,
  data: IProfileData

}

export interface IVerifyTokenAdminPayload {
  token: string,
  type: string
}

