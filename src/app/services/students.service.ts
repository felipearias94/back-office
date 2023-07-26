import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  lastName: string;
  registrationDate: Date;
}

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
