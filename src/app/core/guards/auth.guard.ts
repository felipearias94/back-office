import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((isAuth) => {
      // SI ESTA AUTENTICADO LO DEJO VER LA PANTALLA...
      if (isAuth) return true;

      // SI NO ESTA AUTENTICADO LO MANDO AL LOGIN
      return router.createUrlTree(['/auth/login']);
    })
  );
};
