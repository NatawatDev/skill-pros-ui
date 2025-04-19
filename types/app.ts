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

export interface IResponseProfile {
  success: boolean
  message: string,
  data: IProfileData

}