import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailControl = new FormControl('felipe.arias@gmail.com', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl('123123123', [
    Validators.required,
    Validators.minLength(6),
  ]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthService) {}

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.getRawValue());
    }
  }
}
