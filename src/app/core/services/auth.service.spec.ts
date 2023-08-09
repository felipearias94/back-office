import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { MockProvider } from 'ng-mocks';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [provideAnimations(), MockProvider(Router)],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('if login is valid -> authUser$ should emit a value', (done) => {
    const mockUser: User = {
      id: 1,
      email: 'felipe@gmail.com',
      password: '123456',
      name: 'Felipe',
      lastName: 'Arias',
      token: 'skj3kjsdiamsdasj',
    };

    const mockResponse: User[] = [mockUser];

    service.login({
      email: mockUser.email,
      password: mockUser.password,
    });

    httpController
      .expectOne({
        method: 'GET',
        url: `http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`,
      })
      .flush(mockResponse);

    service.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(mockUser);
        done();
      },
    });
  });
});
