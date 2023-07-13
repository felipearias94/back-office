import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { User } from 'src/app/interfaces/User';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';

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

  onEditUser(userToEdit: User): void {
    this.matDialog
      .open(UserFormDialogComponent, { data: userToEdit })
      .afterClosed()
      .subscribe({
        next: (updatedUser: User) => {
          this.users = this.users.map((user: User) => {
            return user.id === updatedUser.id ? updatedUser : user;
          });
        },
      });
  }

  onDeleteUser(userToDelete: User): void {
    this.matDialog
      .open(ConfirmActionModalComponent, {
        data: {
          title: 'Borrar selección',
          message: `Está seguro de borrar a ${userToDelete.name} ${userToDelete.lastName}?`,
          type: ConfirmationType.DELETE,
        },
      })
      .afterClosed()
      .subscribe((confirmation) => {
        if (confirmation) {
          this.users = this.users.filter((user) => user.id !== userToDelete.id);
        }
      });
  }
}
