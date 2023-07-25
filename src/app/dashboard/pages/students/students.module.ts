import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, SharedModule],
})
export class StudentsModule {}
