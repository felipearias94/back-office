import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  onAddNewStudent(): void {
    console.log('new student');
  }
}
