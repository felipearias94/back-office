import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudentsModule } from './pages/students/students.module';
import { CoursesModule } from './pages/courses/courses.module';
import { InscriptionsModule } from './pages/inscriptions/inscriptions.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule,
    UsersModule,
    StudentsModule,
    CoursesModule,
    InscriptionsModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
