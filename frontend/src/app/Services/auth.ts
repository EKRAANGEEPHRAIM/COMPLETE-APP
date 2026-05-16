import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginFormData, RegisterFormData, UpdateUserFormData, User } from '../Models/authModel';
import {  catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;


  //LOGIN
  login(data : LoginFormData) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }


  //REGISTER
  register(data : RegisterFormData) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      catchError((error) => {
        console.error('Register failed:', error);
        return throwError(() => error);
      })
    );
  }


  //UPDATE USER
  updateUser(userId : number , data : UpdateUserFormData) : Observable<User> {
  const token  = localStorage.getItem('token');
 const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
 });
 

 return this.http.patch<User>(`${this.apiUrl}/auth/update/${userId}`, data, { headers })
 .pipe(
  catchError((error) => {
    console.error('Update user failed:', error);
    return throwError(() => error);
  })
 );
  }


  //GET PROFILE
  getProfile() : Observable<User> {
const token  = localStorage.getItem('token');
const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
});

return this.http.get<User>(`${this.apiUrl}/auth/profile`, { headers })
.pipe(
  catchError((error) => {
    console.error('Get profile failed:', error);
    return throwError(() => error);
  })
);
  }
}