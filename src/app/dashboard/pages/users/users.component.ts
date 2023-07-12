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
  users: User[] = [
    {
      id: 1,
      name: 'Felipe',
      lastName: 'Arias',
      email: 'felipe.arias@gmail.com',
      password: '123123123',
    },
    {
      id: 2,
      name: 'Juan',
      lastName: 'Perez',
      email: 'jperez@gmail.com',
      password: '123123123',
    },
  ];

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (formValue) => {
          if (formValue) {
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
