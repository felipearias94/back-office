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
    private notificationService: NotificationService
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
            this.notificationService.showNotification(
              `Se creó correctamente al usuario: ${newUser.name} ${newUser.lastName}`
            );
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
          this.userService.editUser(updatedUser);
          if (updatedUser) {
            this.notificationService.showNotification(
              `Se actualizó al usuario: ${updatedUser.name} ${updatedUser.lastName}`
            );
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
          this.userService.deleteUser(userToDelete.id);
          this.notificationService.showNotification(
            `Se eliminó al usuario: ${userToDelete.name} ${userToDelete.lastName}`
          );
        }
      });
  }
}
