import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  @Input() dataSource: Course[] = [];
  @Output() deleteStudent = new EventEmitter<Course>();
  @Output() editStudent = new EventEmitter<Course>();
  displayedColumns: string[] = [
    'id',
    'fullName',
    'registrationDate',
    'actions',
  ];
}
