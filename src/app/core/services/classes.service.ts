import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Class } from 'src/app/interfaces/Classes';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private classesUrl = environment.baseApiUrl + 'classes/';
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoading$.asObservable();
  private _classes$ = new BehaviorSubject<Class[]>([]);
  public classes$ = this._classes$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {}

  loadClasses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Class[]>(this.classesUrl).subscribe({
      next: (response) => {
        this._classes$.next(response);
      },
      error: () => {
        this.notificationService.showNotification('Error de conección');
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    });
  }

  getLectures(): Observable<Class[]> {
    return this.classes$;
  }

  getLectureById(lectureId: number): Observable<Class | undefined> {
    return this.classes$.pipe(
      take(1),
      map((lectures) => lectures.find((lecture) => lecture.id === lectureId))
    );
  }

  createLecture(newLecture: Class): void {
    this.httpClient
      .post<Class>(this.classesUrl, newLecture)
      .pipe(
        mergeMap((studentCreated) =>
          this._classes$.pipe(
            take(1),
            map((currentArray) => [...currentArray, studentCreated])
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._classes$.next(updatedArray);
          this.notificationService.showNotification(
            `Se creó correctamente la clase: ${newLecture.className}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'Ocurrio un error al crear la clase'
          );
        },
      });
  }

  editLecture(lectureToUpate: Class): void {
    this.httpClient
      .put(`${this.classesUrl}${lectureToUpate.id}`, lectureToUpate)
      .subscribe({
        next: () => {
          this.loadClasses();
          this.notificationService.showNotification(
            `Se actualizó la clase: ${lectureToUpate.className}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'Ocurrio un error al editar la clase'
          );
        },
      });
  }

  deleteClass(lectureToDelete: Class): void {
    const lectureId = lectureToDelete.id;
    this.httpClient
      .delete(`${this.classesUrl}${lectureId}`)
      .pipe(
        mergeMap((responseUserDelete) =>
          this.classes$.pipe(
            take(1),
            map((currentArray) =>
              currentArray.filter((user) => user.id !== lectureId)
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._classes$.next(updatedArray);
          this.notificationService.showNotification(
            `Se eliminó la clase: ${lectureToDelete.className}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'Ocurrio un error al eliminar la clase'
          );
        },
      });
  }
}
