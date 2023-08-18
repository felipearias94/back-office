import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscriptionActions } from '../store/inscription.actions';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
import { Student } from 'src/app/interfaces/Students';
import {
  selectCoursesOptions,
  selectStudentOption,
} from '../store/inscription.selectors';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscriptions-dialog',
  templateUrl: './inscriptions-dialog.component.html',
  styles: [],
})
export class InscriptionsDialogComponent implements OnInit {
  coursesOptions$: Observable<Course[]>;
  studentsOptions$: Observable<Student[]>;

  studentsIdControl = new FormControl(null, [Validators.required]);
  courseIdControl = new FormControl(null, [Validators.required]);

  inscriptionForm = new FormGroup({
    studentId: this.studentsIdControl,
    courseId: this.courseIdControl,
  });

  constructor(private store: Store, private matDialogRef: MatDialogRef<InscriptionsDialogComponent>) {
    this.coursesOptions$ = this.store.select(selectCoursesOptions);
    this.studentsOptions$ = this.store.select(selectStudentOption);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadCoursesOptions());
    this.store.dispatch(InscriptionActions.loadStudentsOptions());
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      this.store.dispatch(
        InscriptionActions.createInscription({
          payload: this.inscriptionForm.getRawValue(),
        })
      );
      this.matDialogRef.close();
    }
  }
}
