import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ControlErrorMessagePipe } from './pipes/ControlErrorMessage/control-error-message.pipe';
import { HigherFontDirective } from './directives/higher-font.directive';
import { FullNamePipe } from './pipes/full-name/full-name.pipe';
import { BoButtonComponent } from './components/bo-button/bo-button.component';
import { ConfirmActionModalComponent } from './components/confirm-action-modal/confirm-action-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    ControlErrorMessagePipe,
    HigherFontDirective,
    FullNamePipe,
    BoButtonComponent,
    ConfirmActionModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule,
  ],
  exports: [
    // Components
    HeaderComponent,
    BoButtonComponent,
    ConfirmActionModalComponent,
    // Modules
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    // Directives-Pipes
    ControlErrorMessagePipe,
    FullNamePipe,
    HigherFontDirective,
  ],
})
export class SharedModule {}
