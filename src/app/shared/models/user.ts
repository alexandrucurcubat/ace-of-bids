export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  role: UserRole;
  jwt?: string;
  confirmed: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
