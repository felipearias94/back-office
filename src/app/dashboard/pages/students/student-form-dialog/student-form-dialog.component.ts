import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student, StudentForm } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private updateableStudent: Student
  ) {}

  isEditing: boolean = false;

  nameControl = new FormControl<string | null>('', [Validators.required]);
  lastNameControl = new FormControl<string | null>('', [Validators.required]);
  registrationDateControl = new FormControl<Date | null>(new Date(), [
    Validators.required,
  ]);

  studentForm: FormGroup<StudentForm> = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    registrationDate: this.registrationDateControl,
  });

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
    this.studentForm.markAllAsTouched();
  }
}
