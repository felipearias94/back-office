import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() dataSource: User[] = [];
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

  displayedColumns: string[] = ['id', 'fullName', 'email', 'actions'];

  constructor() {}
}
