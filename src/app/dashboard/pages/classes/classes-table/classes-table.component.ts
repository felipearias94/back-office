import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Class } from 'src/app/interfaces/Classes';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss'],
})
export class ClassesTableComponent {
  constructor(private courseService: CoursesService) {}
  @Input() dataSource: Class[] = [];
  @Output() deleteClass = new EventEmitter<Class>();
  @Output() editClass = new EventEmitter<Class>();

  displayedColumns: string[] = [
    'id',
    'className',
    'courseName',
    'durationInMin',
    'actions',
  ];

  getCourseName(courseId: number): string | undefined {
    return this.courseService.getCourseNameById(courseId);
  }
}
