import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassesFormDialogComponent } from './classes-form-dialog/classes-form-dialog.component';
import { ClassesTableComponent } from './classes-table/classes-table.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

@NgModule({
  declarations: [ClassesComponent, ClassesFormDialogComponent, ClassesTableComponent, ClassDetailsComponent],
  imports: [CommonModule, SharedModule],
})
export class ClassesModule {}
