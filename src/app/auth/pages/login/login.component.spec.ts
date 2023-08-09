import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [provideAnimations()],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be invalid if fields are empty', () => {
    component.emailControl.setValue('');
    component.passwordControl.setValue('');

    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login() and invalid form, should call markAllAsTouched() method', () => {
    component.emailControl.setValue('');
    component.passwordControl.setValue('');

    expect(component.loginForm.invalid).toBeTrue();

    const spyOfMarkAllAsTouched = spyOn(
      component.loginForm,
      'markAllAsTouched'
    );
    component.login();

    expect(spyOfMarkAllAsTouched).toHaveBeenCalled();
  });

  it('login() -> with a valid form should call login() from AuthService', () => {
    const authService = TestBed.inject(AuthService);

    component.emailControl.setValue('fake@mail.com');
    component.passwordControl.setValue('123456');

    expect(component.loginForm.valid).toBeTrue();
    const spyOnAuthServiceLogin = spyOn(authService, 'login');
    component.login();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
