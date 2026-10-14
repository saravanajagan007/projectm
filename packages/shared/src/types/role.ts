export const UserRole = {
  ADMIN: 'ADMIN',
  ADD_COMPANY: 'ADD_COMPANY',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ALL_ROLES: UserRole[] = [UserRole.ADMIN, UserRole.ADD_COMPANY];
