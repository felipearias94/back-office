import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';
import { baseUrl, baseUsersUrl } from 'src/app/shared/constants/urls';

export interface UserCredentials {
  email: string | null;
  password: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(baseUsersUrl, {
        params: {
          token: localStorage.getItem('token') || '',
        },
      })
      .pipe(
        map((usersResponse) => {
          return !!usersResponse.length;
        })
      );
  }

  public login(payload: UserCredentials): void {
    this.httpClient
      .get<User[]>(baseUsersUrl, {
        params: {
          email: payload.email || '',
          password: payload.password || '',
        },
      })
      .subscribe({
        next: (response) => {
          if (response.length) {
            const authUser = response[0];
            this._authUser$.next(authUser);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', authUser.token);
            this.notification.showNotification(
              `Bienvenid@ ${authUser.name} ${authUser.lastName}`
            );
          } else {
            this.notification.showNotification(
              `Usuario y/o contraseña incorrecto`
            );
          }
        },
      });
  }
}
