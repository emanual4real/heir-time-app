import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = 'http://localhost:8080/api';
  private _user = new BehaviorSubject<User | null>(null);

  private _userList = new BehaviorSubject<User[]>([]);

  readonly user = this._user.asObservable();
  readonly userList = this._userList.asObservable();

  constructor(private http: HttpClient) {}

  getMe() {
    this.http.get<User>(`${this.baseApiUrl}/user/me`).subscribe((data) => {
      this._user.next(data);
    });
  }

  getAllUsers() {
    this.http.get<User[]>(`${this.baseApiUrl}/user`).subscribe((data) => {
      this._userList.next(data);
    });
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
    this.http
      .post<User>(`${this.baseApiUrl}/user/login`, body)
      .subscribe((data) => {
        this._user.next(data);
      });
  }

  logout() {
    this.http.get(`${this.baseApiUrl}/user/logout`).subscribe(() => {
      this._user.next(null);
    });
  }
}
