import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Class } from '../interfaces/Classes';

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
