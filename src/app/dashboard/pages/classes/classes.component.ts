import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Class } from 'src/app/interfaces/Classes';
import { ClassesFormDialogComponent } from './classes-form-dialog/classes-form-dialog.component';
import {
  ConfirmActionModalComponent,
  ConfirmationType,
} from 'src/app/shared/components/confirm-action-modal/confirm-action-modal.component';
import { ClassesService } from 'src/app/core/services/classes.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  classes$: Observable<Class[]>;

  constructor(
    private classesService: ClassesService,
    private matDialog: MatDialog
  ) {
    this.classesService.loadClasses();
    this.classes$ = this.classesService.getLectures();
  }

  onAddNewClass(): void {
    this.matDialog
      .open(ClassesFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (newClass: Class) => {
          if (newClass) {
            this.classesService.createLecture(newClass);
          }
        },
      });
  }

  onEditClass(classToEdit: Class): void {
    this.matDialog
      .open(ClassesFormDialogComponent, { data: classToEdit })
      .afterClosed()
      .subscribe({
        next: (updatableClass: Class) => {
          if (updatableClass) {
            this.classesService.editLecture(updatableClass);
          }
        },
      });
  }

  onDeleteClass(classToDelete: Class): void {
    this.matDialog
      .open(ConfirmActionModalComponent, {
        data: {
          title: `Borrar a ${classToDelete.className}`,
          message: `Estás seguro de borrar a ${classToDelete.className}?`,
          type: ConfirmationType.DELETE,
        },
      })
      .afterClosed()
      .subscribe((confirmation) => {
        if (confirmation) {
          this.classesService.deleteClass(classToDelete);
        }
      });
  }
}
