import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Student } from 'src/app/interfaces/Students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private generatedIDs = new Set<number>();
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor() {}

  private generateUniqueID(): number {
    const randomNumber = Math.floor(Math.random() * 1000);
    if (this.generatedIDs.has(randomNumber)) {
      return this.generateUniqueID();
    }
    this.generatedIDs.add(randomNumber);
    return randomNumber;
  }

  public getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  public getStudentById(studentId: number): Observable<Student | undefined> {
    return this.students$.pipe(
      take(1),
      map((students) => students.find((student) => student.id === studentId))
    );
  }

  public createStudent(newStudent: Student): void {
    this.students$.next([
      ...this.students$.value,
      {
        id: this.generateUniqueID(),
        name: newStudent.name,
        lastName: newStudent.lastName,
        registrationDate: newStudent.registrationDate,
      },
    ]);
  }

  public editStudent(studentToUpdate: Student): void {
    this.students$.next(
      this.students$.getValue().map((student) => {
        return student.id === studentToUpdate.id ? studentToUpdate : student;
      })
    );
  }

  public deleteStudent(studentId: number): void {
    this.students$.next(
      this.students$.getValue().filter((student) => student.id !== studentId)
    );
  }
}
