import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { BehaviorSubject, Observable, filter, map, mergeMap, take } from 'rxjs';
import { baseUrl } from 'src/app/shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = baseUrl + 'users';
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  public loadUsers() {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(this.usersUrl).subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notificationService.showNotification('Error de conección');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    });
  }

  public getUsers(): Observable<User[]> {
    return this.users$;
  }

  public getUserById(id: number): Observable<User | undefined> {
    return this._users$.pipe(
      take(1),
      map((users) => users.find((user) => user.id === id))
    );
  }

  public createUser(newUser: User): void {
    this.httpClient
      .post<User>(this.usersUrl, newUser)
      .pipe(
        mergeMap((userCreated) =>
          this._users$.pipe(
            take(1),
            map((currentArray) => [...currentArray, userCreated])
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._users$.next(updatedArray);
        },
      });
  }

  public editUser(userToUpdate: User): void {
    this._users$.next(
      this._users$.getValue().map((user: User) => {
        return user.id === userToUpdate.id ? userToUpdate : user;
      })
    );
  }

  public deleteUser(userId: number): void {
    this.httpClient
      .delete(`${this.usersUrl}/${userId}`)
      .pipe(
        mergeMap((responseUserDelete) =>
          this.users$.pipe(
            take(1),
            map((currentArray) =>
              currentArray.filter((user) => user.id !== userId)
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._users$.next(updatedArray);
        },
      });
  }
}
