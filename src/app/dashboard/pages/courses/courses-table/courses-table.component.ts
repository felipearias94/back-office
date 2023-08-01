import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from 'src/app/interfaces/Courses';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  @Input() dataSource: Course[] = [];
  @Output() deleteCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  
  displayedColumns: string[] = [
    'id',
    'courseName',
    'teacher',
    'duration',
    'actions',
  ];
}
