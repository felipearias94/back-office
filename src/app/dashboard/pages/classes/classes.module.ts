import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassesFormDialogComponent } from './classes-form-dialog/classes-form-dialog.component';
import { ClassesTableComponent } from './classes-table/classes-table.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { RouterModule } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@NgModule({
  declarations: [
    ClassesComponent,
    ClassesFormDialogComponent,
    ClassesTableComponent,
    ClassDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class ClassesModule {}
