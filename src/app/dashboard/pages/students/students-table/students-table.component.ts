import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from 'src/app/interfaces/Students';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  isAdmin$: Observable<boolean>;
  @Input() dataSource: Student[] = [];
  @Output() deleteStudent = new EventEmitter<Student>();
  @Output() editStudent = new EventEmitter<Student>();
  displayedColumns: string[] = [
    'id',
    'fullName',
    'registrationDate',
    'actions',
  ];

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
}
