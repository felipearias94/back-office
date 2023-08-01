import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course, CourseForm } from 'src/app/interfaces/Courses';

@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: ['./courses-form-dialog.component.scss'],
})
export class CoursesFormDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateableCourse: Course
  ) {}

  isEditing: boolean = !!this.updateableCourse;

  courseNameControl = new FormControl<string | null>('');
  teacherControl = new FormControl<string | null>('');
  startDateControl = new FormControl<Date | null>(new Date());
  endDateControl = new FormControl<Date | null>(new Date());

  courseForm: FormGroup<CourseForm> = new FormGroup({
    courseName: this.courseNameControl,
    teacher: this.teacherControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });

  ngOnInit(): void {
    this.parseCourseToEdit();
  }

  private parseCourseToEdit(): void {
    this.courseForm.patchValue(this.updateableCourse);
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    if (this.isEditing) {
      this.dialogRef.close({
        ...this.courseForm.value,
        id: this.updateableCourse.id,
      });
      return;
    }
    this.dialogRef.close(this.courseForm.value);
  }
}
