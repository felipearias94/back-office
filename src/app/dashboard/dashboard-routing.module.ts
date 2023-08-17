import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { HomeComponent } from './pages/home/home.component';
import { CourseDetailsComponent } from './pages/courses/course-details/course-details.component';
import { ClassDetailsComponent } from './pages/classes/class-details/class-details.component';
import { roleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    canActivate: [roleGuard],
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'students',
    canActivate: [roleGuard],
    loadChildren: () =>
      import('./pages/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    canActivate: [roleGuard],
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'classes',
    canActivate: [roleGuard],
    loadChildren: () =>
      import('./pages/classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: '**',
    redirectTo: '/dashboard/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
