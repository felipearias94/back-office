import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/User';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { ConfirmActionModalComponent } from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @ViewChild('table') userTable: MatTable<User>;
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
            return user.id === updatedUser.id ? updatedUser : user;
          });
          console.log(this.dataSource);
        },
      });
    this.userTable.renderRows();
  }

  deleteUser(element: User): void {
    this.matDialog
      .open(ConfirmActionModalComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dataSource = this.dataSource.filter(
            (user) => user.id !== element.id
          );
        }
      });
    this.userTable.renderRows();
  }
}
