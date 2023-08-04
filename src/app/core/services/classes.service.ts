import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Class } from 'src/app/interfaces/Classes';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private generatedIDs = new Set<number>();

  private classes$ = new BehaviorSubject<Class[]>([
    {
      id: 1,
      courseId: 1,
      className: 'Componentes y módulos',
      durationInMin: 120,
    },
  ]);
  public _classes = this.classes$.asObservable();

  constructor() {
    this.classes$
      .getValue()
      .forEach((lecture) => this.generatedIDs.add(lecture.id));
  }

  getLectures(): Observable<Class[]> {
    return this._classes;
  }

  getLectureById(lectureId: number): Observable<Class | undefined> {
    return this._classes.pipe(
      take(1),
      map((lectures) => lectures.find((lecture) => lecture.id === lectureId))
    );
  }

  createLecture(newLecture: Class): void {
    this.classes$.next([
      ...this.classes$.value,
      {
        id: this.generateUniqueID(),
        courseId: newLecture.courseId,
        className: newLecture.className,
        durationInMin: newLecture.durationInMin,
      },
    ]);
  }

  editLecture(lectureToUpate: Class): void {
    this.classes$.next(
      this.classes$.getValue().map((lecture: Class) => {
        return lecture.id === lectureToUpate.id ? lectureToUpate : lecture;
      })
    );
  }

  deleteClass(lectureId: number): void {
    this.classes$.next(
      this.classes$.getValue().filter((lecture) => lecture.id !== lectureId)
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
