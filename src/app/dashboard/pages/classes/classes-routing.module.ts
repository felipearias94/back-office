import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassDetailsComponent } from './class-details/class-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassesComponent,
      },
      {
        path: ':classId',
        component: ClassDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
