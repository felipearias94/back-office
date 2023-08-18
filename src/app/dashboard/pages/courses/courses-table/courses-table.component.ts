import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  @Input() dataSource: Course[] = [];
  @Output() deleteCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();

  isAdmin$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  displayedColumns: string[] = [
    'id',
    'courseName',
    'teacher',
    'duration',
    'actions',
  ];
}
