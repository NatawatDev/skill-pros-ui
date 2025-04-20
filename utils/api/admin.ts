import type { IAdminListResponse } from "~/types/admin";
import { useApi } from "./baseService";
import type { IResponse } from "~/types/form";
import type { 
  IForgetPasswordAdminPayload, 
  IInviteAdminPayload, 
  IProfileAdminResponse, 
  IResetPasswordAdminPayload, 
  ISetupPasswordAdminPayload, 
  IVerifyTokenAdminPayload 
} from "~/types/auth";

export const useAdminApi = () => {
  const api = useApi()

  const getAdminList = (params: { page?: number; limitPerPage?: number; searchText?: string }) => {
    return api<IAdminListResponse>('/admins', {
      method: 'GET',
      query: params
    })
  }

  const forgetPasswordAdmin = (payload: IForgetPasswordAdminPayload) => {
    return api<IResponse>('/admins/forget-password', {
      method: 'POST',
      body: payload
    })
  }

  const resetPasswordAdmin = (payload: IResetPasswordAdminPayload) => {
    return api<IResponse>('/admins/reset-password', {
      method: 'POST',
      body: payload
    })
  }

  const verifyTokenAdmin = (payload: IVerifyTokenAdminPayload) => {
    return api<IResponse>('/admins/verify-token', {
      method: 'POST',
      body: payload
    })
  }

  
  const setupPasswordAdmin = (payload: ISetupPasswordAdminPayload) => {
    return api<IResponse>('/admins/setup-password', {
      method: 'POST',
      body: payload
    })
  }

  const inviteAdmin = (payload: IInviteAdminPayload) => {
    return api<IResponse>('/admins/invite', {
      method: 'POST',
      body: payload
    })
  }

  const profileAdmin = () => {
    return api<IProfileAdminResponse>('/admins/profile', {
      method: 'GET',
    })
  }

  return { 
    getAdminList, 
    forgetPasswordAdmin,
    resetPasswordAdmin,
    verifyTokenAdmin,
    setupPasswordAdmin,
    inviteAdmin,
    profileAdmin
  }
}
