import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
