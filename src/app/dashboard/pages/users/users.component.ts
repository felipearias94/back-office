import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  constructor(private matDialog: MatDialog) {}
  users: User[] = [];

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (formValue) {
            console.log('SE RECIBIO', formValue);
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: formValue.name,
                lastName: formValue.lastName,
                email: formValue.email,
                password: formValue.password,
              },
            ];
          }
        },
      });
  }
}
