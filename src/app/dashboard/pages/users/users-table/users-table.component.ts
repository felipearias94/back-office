import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/User';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { ConfirmActionModalComponent } from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() dataSource: User[] = [];

  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  constructor(private matDialog: MatDialog) {}

  editUser(element: User): void {
    this.matDialog
      .open(UserFormDialogComponent, { data: element })
      .afterClosed()
      .subscribe({
        next: (updatedUser: User) => {
          this.dataSource = this.dataSource.map((user: User) => {
            return user.id === updatedUser.id ? { ...updatedUser } : user;
          });
        },
      });
  }
  
  deleteUser(element: User): void {
    this.matDialog
      .open(ConfirmActionModalComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dataSource.filter((user) => user.id !== element.id);
        }
      });
  }
}
