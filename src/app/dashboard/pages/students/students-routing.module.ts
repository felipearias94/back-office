import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: ':studentId',
        component: StudentDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
