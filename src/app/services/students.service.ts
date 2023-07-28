import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../interfaces/Students';

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

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
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
    console.log(this.students$)
  }
}
