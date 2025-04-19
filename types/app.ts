export interface IProfileData {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  createsAt: Date
}

export interface IResponseProfile {
  success: boolean
  message: string,
  data: IProfileData

}