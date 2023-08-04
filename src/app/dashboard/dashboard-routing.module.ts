import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentDetailsComponent } from './pages/students/student-details/student-details.component';
import { CourseDetailsComponent } from './pages/courses/course-details/course-details.component';
import { ClassDetailsComponent } from './pages/classes/class-details/class-details.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ],
  },
  {
    path: 'students',
    children: [
      {
        path: '',
        component: StudentsComponent,
      },

      {
        path: ':studentId',
        component: StudentDetailsComponent,
      },
    ],
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: ':courseId',
        component: CourseDetailsComponent,
      },
    ],
  },
  {
    path: 'classes',
    children: [
      {
        path: '',
        component: ClassesComponent,
      },
      {
        path: ':classId',
        component: ClassDetailsComponent,
      },
    ],
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
