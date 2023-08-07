import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StudentsModule } from './pages/students/students.module';
import { CoursesModule } from './pages/courses/courses.module';
import { ClassesModule } from './pages/classes/classes.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoursesService } from '../core/services/courses.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HomeModule,
    RouterModule,
    UsersModule,
    StudentsModule,
    ClassesModule,
    CoursesModule,
    SharedModule,
  ],
  providers: [CoursesService],
  exports: [DashboardComponent],
})
export class DashboardModule {}
