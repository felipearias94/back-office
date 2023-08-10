import { Injectable } from '@angular/core';
import { User } from '../../interfaces/User';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { generateRandomToken } from 'src/app/shared/constants/generate-token';
import { environment } from 'src/environments/environment.prod';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private baseUsersUrl = environment.baseApiUrl + 'users/';

  public isLoading$ = this._isLoading$.asObservable();
  public registeredUser: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService
  ) {}

  public loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(this.baseUsersUrl).subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: (error) => {
        this.handleErrorService.handleErrorResponse(error);
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
      .post<User>(this.baseUsersUrl, {
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
          this.registeredUser = true;
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }

  public editUser(userToUpdate: User): void {
    this.httpClient
      .put(`${this.baseUsersUrl}${userToUpdate.id}`, userToUpdate)
      .subscribe({
        next: () => {
          this.loadUsers();
          this.notificationService.showNotification(
            `Se actualizó al usuario: ${userToUpdate.name} ${userToUpdate.lastName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }

  public deleteUser(userToDelete: User): void {
    const userId = userToDelete.id;
    this.httpClient
      .delete(`${this.baseUsersUrl}${userId}`)
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
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }
}
