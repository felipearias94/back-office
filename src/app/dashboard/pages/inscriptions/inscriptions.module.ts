import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InscriptionsComponent],
  imports: [CommonModule, SharedModule],
})
export class InscriptionsModule {}
