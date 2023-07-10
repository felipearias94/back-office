import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserForm } from 'src/app/interfaces/User';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent {
  constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>) {}

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  userForm: FormGroup<UserForm> = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  hidePassword = true;
  userRegistered = [];

  getErrorMessages(field: FormControl): string {
    if (field.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
      return;
    }
    this.userForm.markAllAsTouched();
  }
}
