import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Class, ClassForm } from 'src/app/interfaces/Classes';
import { Course } from 'src/app/interfaces/Courses';
import { numberRangeValidator } from 'src/app/shared/validators/number-range-validator';

@Component({
  selector: 'app-classes-form-dialog',
  templateUrl: './classes-form-dialog.component.html',
  styleUrls: ['./classes-form-dialog.component.scss'],
})
export class ClassesFormDialogComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private dialogRef: MatDialogRef<ClassesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updatableClass: Class
  ) {
    this.courses$ = this.coursesService.getCourses();
  }

  isEditing = !!this.updatableClass;

  classNameControl = new FormControl<string | null>('', [Validators.required]);
  courseIdControl = new FormControl<number | null>(null, [Validators.required]);
  durationControl = new FormControl<number | null>(null, [
    Validators.required,
    numberRangeValidator(0, 200),
  ]);

  classForm: FormGroup<ClassForm> = new FormGroup({
    className: this.classNameControl,
    courseId: this.courseIdControl,
    durationInMin: this.durationControl,
  });

  ngOnInit(): void {
    this.parseClassToEdit();
  }

  private parseClassToEdit(): void {
    this.classForm.patchValue(this.updatableClass);
  }

  onSubmit(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.dialogRef.close({
        ...this.classForm.value,
        id: this.updatableClass.id,
      });
      return;
    }

    this.dialogRef.close(this.classForm.value);
  }
}
