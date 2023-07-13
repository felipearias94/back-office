import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, UserForm } from 'src/app/interfaces/User';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private updeteableUser: User
  ) {}

  ngOnInit(): void {
    this.parseUserToEdit();
  }

  //Form Controls
  nameControl = new FormControl<string | null>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastNameControl = new FormControl<string | null>('', [Validators.required]);
  emailControl = new FormControl<string | null>('', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl<string | null>('', [
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
  isEditing = !!this.updeteableUser;

  parseUserToEdit(): void {
    this.userForm.patchValue(this.updeteableUser);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditing) {
        this.dialogRef.close({
          ...this.userForm.value,
          id: this.updeteableUser.id,
        });
        return;
      }
      this.dialogRef.close(this.userForm.value);
      return;
    }
    this.userForm.markAllAsTouched();
  }
}
