import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student, StudentForm } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public updateableStudent: Student
  ) {}

  isEditing: boolean = !!this.updateableStudent;

  nameControl = new FormControl<string | null>('', [Validators.required]);
  lastNameControl = new FormControl<string | null>('', [Validators.required]);
  registrationDateControl = new FormControl<Date | null>(new Date(), [
    Validators.required,
  ]);
  coursesControl = new FormControl<number[] | null>([], [Validators.required]);

  studentForm: FormGroup<StudentForm> = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    coursesId: this.coursesControl,
    registrationDate: this.registrationDateControl,
  });

  ngOnInit(): void {
    this.parseStudentToEdit();
  }

  private parseStudentToEdit(): void {
    this.studentForm.patchValue(this.updateableStudent);
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.isEditing) {
        this.dialogRef.close({
          ...this.studentForm.value,
          id: this.updateableStudent.id,
        });
        return;
      }
      this.dialogRef.close(this.studentForm.value);
      return;
    }
  }
}
