import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Observable, map } from 'rxjs';
import { AcessToken } from '../model/acess-token';
import { AuthMe } from '../model/auth-me';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private API = '/api/login';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  logar(user: User): Observable<AcessToken> {
    return this.http.post<AcessToken>(this.API, user).pipe(
      map((response) => {
        localStorage.setItem('token', response.access_token);

        this.loadFullName();

        return response;
      }),
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  loadFullName(): Observable<string> {
    return this.http.get<AuthMe>('/api/auth/me').pipe(
      map((auth) => {
        localStorage.setItem('fullName', JSON.stringify(auth.fullName));
        return auth.fullName;
      }),
    );
  }

  isLoggedIn() {
    return this.getToken();
  }
}
