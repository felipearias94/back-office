import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { User } from 'src/app/interfaces/User';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
  ) {
    this.isLoading$ = this.userService.isLoading$;
    this.userService.loadUsers();
    this.users$ = this.userService.getUsers();
  }

  onCreateUser(): void {
    this.matDialog
      .open(UserFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (newUser: User) => {
          if (newUser) {
            this.userService.createUser(newUser);
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
          if (updatedUser) {
            this.userService.editUser(updatedUser);
          }
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
          this.userService.deleteUser(userToDelete);
        }
      });
  }
}
