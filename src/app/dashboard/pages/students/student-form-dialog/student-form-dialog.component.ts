import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student, StudentForm } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormDialogComponent {
  constructor(
    private dialoRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private updateableStudent: Student
  ) {}

  isEditing: boolean = false;

  nameControl = new FormControl<string | null>('');
  lastNameControl = new FormControl<string | null>('');
  registrationDateControl = new FormControl<Date | null>(new Date());

  userForm: FormGroup<StudentForm> = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    registrationDate: this.registrationDateControl,
  });

  onSubmit(): void{};
}
