import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { Student } from 'src/app/interfaces/Students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students$: Observable<Student[]>;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  onAddNewStudent(): void {
    this.matDialog.open(StudentFormDialogComponent);
  }

  onEditStudent(studentToEdit: Student): void {}

  onDeleteStudent(studentToDelete: Student): void {}
}
