export type AdminStatus = 'pending' | 'active' | 'suspended'
export type AdminRole = 'editor' | 'superadmin'

export interface IAdmin {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
  status: AdminStatus
  role: AdminRole
  inviteToken: string | null
  resetPasswordToken: string | null
  refreshToken: string
  invitedAt: string | null
  lastLoginAt: string
  invitedBy: number | null
  createdAt: string
  updatedAt: string
}

export interface IPaginationMeta {
  totalItems: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface IAdminListResponse {
  success: boolean
  data: IAdmin[]
  meta: IPaginationMeta
}
