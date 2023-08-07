import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
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
    private matDialog: MatDialog
  ) {
    this.coursesService.loadCourses();
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
          if (updatedCourse) {
            this.coursesService.editCourse(updatedCourse);
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
        if (confirmation) {
          this.coursesService.deleteCourse(courseToDelete);
        }
      });
  }
}
