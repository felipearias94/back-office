import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Class {
  id: number;
  courseId: number;
  students: number[];
}

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private inscriptions$ = new BehaviorSubject<Class[]>([]);

  constructor() {}

  getInscriptions(): Observable<Class[]> {
    return this.inscriptions$.asObservable();
  }
}
