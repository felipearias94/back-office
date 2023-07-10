import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, HomeModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
