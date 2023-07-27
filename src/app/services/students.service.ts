import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../interfaces/Students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor() {}

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }
}
