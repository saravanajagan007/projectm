import { UserRole } from './role';

export interface UserDto {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSessionResponse {
  user: UserDto;
  message?: string;
}
