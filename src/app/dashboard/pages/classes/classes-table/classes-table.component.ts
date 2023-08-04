import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Class } from 'src/app/interfaces/Classes';

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
