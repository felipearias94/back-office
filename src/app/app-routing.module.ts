import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UserDetailsComponent } from './dashboard/pages/users/user-details/user-details.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
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
        path: '**',
        redirectTo: '/dashboard/home',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
