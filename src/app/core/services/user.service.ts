import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { BehaviorSubject, Observable, filter, map, mergeMap, take } from 'rxjs';
import { baseUsersUrl } from 'src/app/shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { generateRandomToken } from 'src/app/shared/constants/generate-token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
    this.httpClient.get<User[]>(baseUsersUrl).subscribe({
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
      .post<User>(baseUsersUrl, {
        ...newUser,
        token: generateRandomToken(),
      })
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
          this.notificationService.showNotification(
            `Se creó correctamente al usuario: ${newUser.name} ${newUser.lastName}`
          );
        },
      });
  }

  public editUser(userToUpdate: User): void {
    this.httpClient
      .put(`${baseUsersUrl}${userToUpdate.id}`, userToUpdate)
      .subscribe({
        next: () => this.loadUsers(),
      });
  }

  public deleteUser(userToDelete: User): void {
    const userId = userToDelete.id;
    this.httpClient
      .delete(`${baseUsersUrl}${userId}`)
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
          this.notificationService.showNotification(
            `Se eliminó al usuario: ${userToDelete.name} ${userToDelete.lastName}`
          );
        },
      });
  }
}
