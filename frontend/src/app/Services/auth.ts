import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  UpdateUserFormData,
  User,
} from '../Models/authModel';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  // LOGIN
  login(data: LoginFormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      data
    );
  }

  // REGISTER
  register(data: RegisterFormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/register`,
      data
    );
  }

  // UPDATE USER (NO TOKEN HERE)
  updateUser(
    userId: number,
    data: UpdateUserFormData
  ): Observable<User> {
    return this.http.patch<User>(
      `${this.apiUrl}/auth/update/${userId}`,
      data
    );
  }

  // PROFILE
  getProfile(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/auth/profile`
    );
  }
}