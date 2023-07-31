import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Course, CoursesService } from 'src/app/services/courses.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  onAddNewCourse(): void {}
  onDeleteCourse(event:Event): void {}
  onEditCourse(event:Event): void {}
}
