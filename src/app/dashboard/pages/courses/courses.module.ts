import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CoursesFormDialogComponent,
    CourseDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class CoursesModule {}
