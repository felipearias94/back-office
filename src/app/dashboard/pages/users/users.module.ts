import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  declarations: [UsersComponent, UserFormDialogComponent, UsersTableComponent],
  imports: [CommonModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
