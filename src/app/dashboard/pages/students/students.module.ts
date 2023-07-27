import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from 'src/app/services/students.service';
import { StudentsTableComponent } from './students-table/students-table.component';
import { StudentFormDialogComponent } from './student-form-dialog/student-form-dialog.component';

@NgModule({
  declarations: [StudentsComponent, StudentsTableComponent, StudentFormDialogComponent],
  imports: [CommonModule, SharedModule],
  providers: [StudentsService],
})
export class StudentsModule {}
