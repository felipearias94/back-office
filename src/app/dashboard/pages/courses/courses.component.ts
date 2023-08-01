import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
import { CoursesService } from 'src/app/services/courses.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';

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
  ) {
    this.courses$ = this.coursesService.getCourses();
  }

  onAddNewCourse(): void {
    this.matDialog
      .open(CoursesFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (newCourse: Course) => {
          if (newCourse) {
            this.coursesService.createCourse(newCourse);
            this.notificationService.showNotification(
              `Se creó correctamente el curso: ${newCourse.courseName}`
            );
          }
        },
      });
  }

  onEditCourse(courseToEdit: Course): void {
    this.matDialog
      .open(CoursesFormDialogComponent, { data: courseToEdit })
      .afterClosed()
      .subscribe({
        next: (updatedCourse: Course) => {
          this.coursesService.editCourse(updatedCourse);
          if (updatedCourse) {
            this.notificationService.showNotification(
              `Se actualizó correctamente el curso ${updatedCourse.courseName}`
            );
          }
        },
      });
  }

  onDeleteCourse(courseToDelete: Course): void {
    this.matDialog
      .open(ConfirmActionModalComponent, {
        data: {
          title: 'Borrado',
          message: `Estás seguro de querer borrar al curso ${courseToDelete.courseName}`,
          type: ConfirmationType.DELETE,
        },
      })
      .afterClosed()
      .subscribe((confirmation) => {
        if (confirmation) this.coursesService.deleteCourse(courseToDelete.id);
        this.notificationService.showNotification(`
      Se eliminó el curso ${courseToDelete.courseName}`);
      });
  }
}
