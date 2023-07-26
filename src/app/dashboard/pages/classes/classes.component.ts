import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesService } from 'src/app/services/classes.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  
  constructor(
    private classesService: ClassesService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  onAddNewClass(): void {}
}
