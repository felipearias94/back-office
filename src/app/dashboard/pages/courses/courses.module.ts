import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { CoursesFormDialogComponent } from './courses-form-dialog/courses-form-dialog.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CoursesFeatureStoreEffects } from '../../../store/courses/courses-feature-store.effects';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureStoreFeature as coursesStoreFeature } from '../../../store/courses/courses-feature-store.reducer';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CoursesFormDialogComponent,
    CourseDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(coursesStoreFeature),
    EffectsModule.forFeature([CoursesFeatureStoreEffects]),
  ],
})
export class CoursesModule {}
