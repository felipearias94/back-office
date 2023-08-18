import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/Courses';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';
import { Store } from '@ngrx/store';
import {
  selectCoursesArray,
  selectCoursesState,
} from '../../../store/courses/courses-feature-store.selectors';
import { CoursesFeatureStoreActions } from 'src/app/store/courses/courses-feature-store.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.courses$ = this.store.select(selectCoursesArray);
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesFeatureStoreActions.loadCourses());
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  onAddNewCourse(): void {
    this.matDialog
      .open(CoursesFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (newCourse: Course) => {
          if (newCourse) {
            this.store.dispatch(
              CoursesFeatureStoreActions.createCourse({ payload: newCourse })
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
          if (updatedCourse) {
            this.store.dispatch(
              CoursesFeatureStoreActions.editCourse({ payload: updatedCourse })
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
        if (confirmation) {
          this.store.dispatch(
            CoursesFeatureStoreActions.deleteCourse({
              courseId: courseToDelete.id,
            })
          );
        }
      });
  }
}
