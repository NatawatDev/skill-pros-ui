
import type { ILoginResponse } from "~/types/form";
import { useApi } from "./baseService";
import type { ISigninAdminPayload } from "~/types/auth";

export const useAuthApi = () => {
  const api = useApi()

  const signinAdmin = (payload: ISigninAdminPayload) => {
    console.log('test reset')
    return api<ILoginResponse>('/auth/login', {
      method: 'POST',
      body: payload
    })
  }

  const logoutAdmin = () => {
    return api<ILoginResponse>('/auth/logout', {
      method: 'POST'
    })
  }

  return { signinAdmin, logoutAdmin }
}
