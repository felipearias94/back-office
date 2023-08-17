import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Role, User, UserForm } from 'src/app/interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nameControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastNameControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(2),
  ]);

  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
  ]);

  registerForm = new FormGroup<UserForm>({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: new FormControl<string | null>(Role.guest),
  });

  hidePassword: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  registerNewUser(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.getRawValue() as User);
      this.router.navigate(['/']);
    }
  }
}
