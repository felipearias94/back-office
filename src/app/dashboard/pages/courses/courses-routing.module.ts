import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: ':courseId',
        component: CourseDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
