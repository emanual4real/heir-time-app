import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>(`${this.baseApiUrl}/user/me`);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.baseApiUrl}/user`);
  }

  getUserByEmail(emailAddress: string) {
    const queryParams = new HttpParams();
    queryParams.set('email', emailAddress);
    return this.http.get<User>(`${this.baseApiUrl}/user/me`, {
      params: queryParams,
    });
  }

  register(payload: User) {
    const body = { ...payload };
    return this.http.post<User>(`${this.baseApiUrl}/user/register`, body);
  }

  login(payload: { emailAddress: string; password: string }) {
    return this.http.post<User>(`${this.baseApiUrl}/user/login`, payload);
  }

  logout() {
    return this.http.get(`${this.baseApiUrl}/user/logout`);
  }
}
