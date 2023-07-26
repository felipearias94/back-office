import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ClassesComponent],
  imports: [CommonModule, SharedModule],
})
export class ClassesModule {}
