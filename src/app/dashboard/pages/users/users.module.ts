import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UsersTableComponent,
    UserDetailsComponent,
  ],
  providers: [UserService, NotificationService],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [UsersComponent],
})
export class UsersModule {}
