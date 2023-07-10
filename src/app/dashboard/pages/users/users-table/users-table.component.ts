import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() dataSource: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email'];
}
