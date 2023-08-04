import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from 'src/app/core/services/students.service';
import { StudentsTableComponent } from './students-table/students-table.component';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentFormDialogComponent,
    StudentDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [StudentsService],
})
export class StudentsModule {}
