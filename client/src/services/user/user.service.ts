import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseApiUrl = 'http://localhost:8080/api';

  getMe() {
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

  login(emailAddress: string, password: string) {
    const body = { emailAddress, password };
    return this.http.post<User>(`${this.baseApiUrl}/user/login`, body);
  }

  logout() {
    return this.http.get(`${this.baseApiUrl}/user/logout`);
  }
}
