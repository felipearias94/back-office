import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  onAddNewCourse(): void {}
}
