import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Course {
  id: number;
  startDate: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor() {}

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }
}
