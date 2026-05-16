export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserFormData {
  name?: string;
  email?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}


/**
 * export interface LoginFormData{
    email: string;
    password: string;
}


export interface RegisterFormData{
    email: string;
    password: string;
    name: string;
}

export interface UpdateUserFormData{
    name?: string;
    email?: string;
}


export interface AuthResponse {
    user : Omit<User, 'password'>;
    accessToken: string;
}

 */

