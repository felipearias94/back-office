import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { Student } from 'src/app/interfaces/Students';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.studentsService.loadStudents();
    this.students$ = this.studentsService.getStudents();
  }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectIsAdmin);
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
          if (updatedStudent) {
            this.studentsService.editStudent(updatedStudent);
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
          this.studentsService.deleteStudent(studentToDelete);
        }
      });
  }
}
