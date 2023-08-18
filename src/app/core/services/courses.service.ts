import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Course, CoursePayload } from 'src/app/interfaces/Courses';
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

  public getCourseById(
    courseId: number | undefined
  ): Observable<Course | undefined> {
    return this._courses$.pipe(
      take(1),
      map((courses) => courses.find((course) => course.id === courseId))
    );
  }

  public getCourseNameById(courseId: number | undefined): string | undefined {
    return this._courses$.getValue().find((course) => course.id === courseId)
      ?.courseName;
  }

  public createCourse(newCourse: CoursePayload): Observable<Course> {
    return this.httpClient.post<Course>(this.coursesUrl, newCourse);
  }

  public editCourse(courseToUpdate: Course): Observable<Course> {
    return this.httpClient.put<Course>(
      `${this.coursesUrl}${courseToUpdate.id}`,
      courseToUpdate
    );
  }

  public deleteCourse(courseId: number): Observable<Course> {
    return this.httpClient.delete<Course>(`${this.coursesUrl}${courseId}`);
  }
}
