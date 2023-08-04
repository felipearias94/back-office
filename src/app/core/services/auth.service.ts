import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { NotificationService } from './notification.service';

export interface UserCredentials {
  email: string | null;
  password: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<User | null>(null);
  public _authUser$ = this.authUser$.asObservable();

  constructor(
    private router: Router,
    private notification: NotificationService
  ) {}

  isAuthenticated(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((user) => !!user)
    );
  }

  public login(payload: UserCredentials): void {
    const user: User = {
      id: 1,
      name: 'Felipe',
      lastName: 'Arias',
      email: 'felipe.arias@gmail.com',
      password: '123123123',
    };
    if (payload.email === user.email && payload.password === user.password) {
      this.authUser$.next(user);
      this.router.navigate(['/dashboard/home']);
    }
    else {
      this.notification.showNotification('Email y/o contraseña invalida.');
    }
  }
}
