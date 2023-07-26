import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesService } from 'src/app/services/courses.service';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule],
  providers: [CoursesService],
})
export class CoursesModule {
 
}
