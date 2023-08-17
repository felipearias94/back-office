import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from './notification.service';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoading$.asObservable();
  private coursesUrl = environment.baseApiUrl + 'courses/';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService
  ) {}

  public loadCourses(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Course[]>(this.coursesUrl).subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: (error) => {
        this.handleErrorService.handleErrorResponse(error);
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    });
  }

  public getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  public getCourseById(courseId: number): Observable<Course | undefined> {
    return this._courses$.pipe(
      take(1),
      map((courses) => courses.find((course) => course.id === courseId))
    );
  }

  public getCourseNameById(courseId: number | undefined): string | undefined {
    return this._courses$.getValue().find((course) => course.id === courseId)
      ?.courseName;
  }

  public createCourse(newCourse: Course) {
    this.httpClient
      .post<Course>(this.coursesUrl, newCourse)
      .pipe(
        mergeMap((studentCreated) =>
          this._courses$.pipe(
            take(1),
            map((currentArray) => [...currentArray, studentCreated])
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._courses$.next(updatedArray);
          this.notificationService.showNotification(
            `Se creó correctamente el curso: ${newCourse.courseName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }

  public editCourse(courseToUpdate: Course): void {
    this.httpClient
      .put(`${this.coursesUrl}${courseToUpdate.id}`, courseToUpdate)
      .subscribe({
        next: () => {
          this.loadCourses();
          this.notificationService.showNotification(
            `Se actualizó al curso: ${courseToUpdate.courseName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }

  public deleteCourse(courseToDelete: Course): void {
    const courseId = courseToDelete.id;
    this.httpClient
      .delete(`${this.coursesUrl}${courseId}`)
      .pipe(
        mergeMap((responseUserDelete) =>
          this.courses$.pipe(
            take(1),
            map((currentArray) =>
              currentArray.filter((user) => user.id !== courseId)
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._courses$.next(updatedArray);
          this.notificationService.showNotification(
            `Se eliminó al curso: ${courseToDelete.courseName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }
}
