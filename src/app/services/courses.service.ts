import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Course } from '../interfaces/Courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private generatedIDs = new Set<number>();
  private courses$ = new BehaviorSubject<Course[]>([
    {
      id: 1,
      courseName: 'Desarrollo web - Angular',
      teacher: 'Josue Baez',
      startDate: new Date('06/13/2023'),
      endDate: new Date('08/15/2023'),
    },
  ]);

  constructor() {
    this.courses$
      .getValue()
      .forEach((course) => this.generatedIDs.add(course.id));
  }

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  getCourseById(courseId: number): Observable<Course | undefined> {
    return this.courses$.pipe(
      take(1),
      map((courses) => courses.find((course) => course.id === courseId))
    );
  }

  createCourse(newCourse: Course) {
    this.courses$.next([
      ...this.courses$.value,
      {
        id: this.generateUniqueID(),
        courseName: newCourse.courseName,
        teacher: newCourse.teacher,
        endDate: newCourse.endDate,
        startDate: newCourse.startDate,
      },
    ]);
  }

  public editCourse(courseToUpdate: Course): void {
    this.courses$.next(
      this.courses$.getValue().map((course: Course) => {
        return course.id === courseToUpdate.id ? courseToUpdate : course;
      })
    );
  }

  public deleteCourse(courseId: number): void {
    this.courses$.next(
      this.courses$.getValue().filter((course) => course.id !== courseId)
    );
  }

  private generateUniqueID(): number {
    const randomNumber = Math.floor(Math.random() * 1000);
    if (this.generatedIDs.has(randomNumber)) {
      return this.generateUniqueID();
    }
    this.generatedIDs.add(randomNumber);
    return randomNumber;
  }
}
