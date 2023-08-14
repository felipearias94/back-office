import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Student } from 'src/app/interfaces/Students';
import { environment } from 'src/environments/environment.prod';
import { NotificationService } from './notification.service';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoading$.asObservable();
  private studentsUrl = environment.baseApiUrl + 'students/';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private handleErrorService: HandleErrorService
  ) {}

  public loadStudents(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(this.studentsUrl).subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: (error) => {
        this.handleErrorService.handleErrorResponse(error);
      },
      complete: () => {
        this._isLoading$.next(false);
      },
    });
  }

  public getStudents(): Observable<Student[]> {
    return this.students$;
  }

  public getStudentById(studentId: number): Observable<Student | undefined> {
    return this._students$.pipe(
      take(1),
      map((students) => students.find((student) => student.id === studentId))
    );
  }

  public getStudentsByCourseId(courseId: number): Observable<Student[] | null> {
    return this._students$.pipe(
      take(1),
      map((students) =>
        students.filter((student) => student.coursesId.includes(courseId))
      )
    );
  }

  public createStudent(newStudent: Student): void {
    this.httpClient
      .post<Student>(this.studentsUrl, newStudent)
      .pipe(
        mergeMap((studentCreated) =>
          this._students$.pipe(
            take(1),
            map((currentArray) => [...currentArray, studentCreated])
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._students$.next(updatedArray);
          this.notificationService.showNotification(
            `Se creó correctamente al alumno: ${newStudent.name} ${newStudent.lastName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }

  public editStudent(studentToUpdate: Student): void {
    this.httpClient
      .put(`${this.studentsUrl}${studentToUpdate.id}`, studentToUpdate)
      .subscribe({
        next: () => {
          this.loadStudents();
          this.notificationService.showNotification(
            `Se actualizó al alumno: ${studentToUpdate.name} ${studentToUpdate.lastName}`
          );
        },
        error: () => {
          this.notificationService.showNotification(
            'Ocurrio un error al editar al alumno'
          );
        },
      });
  }

  public deleteStudent(student: Student): void {
    const studentId = student.id;
    this.httpClient
      .delete(`${this.studentsUrl}${studentId}`)
      .pipe(
        mergeMap((responseUserDelete) =>
          this.students$.pipe(
            take(1),
            map((currentArray) =>
              currentArray.filter((user) => user.id !== studentId)
            )
          )
        )
      )
      .subscribe({
        next: (updatedArray) => {
          this._students$.next(updatedArray);
          this.notificationService.showNotification(
            `Se eliminó al usuario: ${student.name} ${student.lastName}`
          );
        },
        error: (error) => {
          this.handleErrorService.handleErrorResponse(error);
        },
      });
  }
}
