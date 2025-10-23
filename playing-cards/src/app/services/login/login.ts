import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface LoginCredentials {
    username: string,
    password: string
}

@Injectable({ providedIn: 'root' })
export class LoginService {

    private http = inject(HttpClient);
    private BASE_URL = 'http://localhost:8000';
    user = signal<User | undefined | null>(undefined);

    login(credentials: LoginCredentials): Observable<User | null | undefined> {
        return this.http.post(this.BASE_URL + '/sessions/login/', credentials).pipe(
            tap((result: any) => {
                localStorage.setItem('token', result['token']);
                const user = Object.assign(new User(), result['user']);
                this.user.set(user);
            }),
            map(() => this.user())
        );
    }

    getUser(): Observable<User | null | undefined> {
        return this.http.get(this.BASE_URL + '/sessions/me/').pipe(
            tap((result: any) => {
                const user = Object.assign(new User(), result);
                this.user.set(user);
            }),
            map(() => this.user())
        );
    }

    logout(): Observable<any> {
        return this.http.get(this.BASE_URL + '/sessions/logout/').pipe(
            tap(() => {
                localStorage.removeItem('token');
                this.user.set(null);
            })
        );
    }

}