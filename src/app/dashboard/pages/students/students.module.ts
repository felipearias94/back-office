import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsService } from 'src/app/services/students.service';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, SharedModule],
  providers: [StudentsService],
})
export class StudentsModule {}
