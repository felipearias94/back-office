import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentsService } from 'src/app/services/students.service';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { Student } from 'src/app/interfaces/Students';
import { ConfirmActionModalComponent, ConfirmationType } from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';

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
  ) {
    this.students$ = this.studentsService.getStudents();
  }

  onAddNewStudent(): void {
    this.matDialog
      .open(StudentFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (newStudent) => {
          if (newStudent) {
            this.studentsService.createStudent(newStudent);
          }
        },
      });
  }

  onEditStudent(studentToEdit: Student): void {
    this.matDialog
      .open(StudentFormDialogComponent, { data: studentToEdit })
      .afterClosed()
      .subscribe({
        next: (updatedStudent: Student) => {
          this.studentsService.editStudent(updatedStudent);
          if (updatedStudent) {
            this.notificationService.showNotification(
              `Se actualizó al estudiante: ${updatedStudent.name} ${updatedStudent.lastName}`
            );
          }
        },
      });
  }

  onDeleteStudent(studentToDelete: Student): void {
    this.matDialog
      .open(ConfirmActionModalComponent, {
        data: {
          title: 'Borrar selección',
          message: `Está seguro de borrar a ${studentToDelete.name} ${studentToDelete.lastName}?`,
          type: ConfirmationType.DELETE,
        },
      })
      .afterClosed()
      .subscribe((confirmation) => {
        if (confirmation) {
          this.studentsService.deleteStudent(studentToDelete.id);
          this.notificationService.showNotification(
            `Se eliminó al usuario: ${studentToDelete.name} ${studentToDelete.lastName}`
          );
        }
      });
  }
}
