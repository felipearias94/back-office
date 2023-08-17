import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectHasRole } from 'src/app/store/auth/auth.selector';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(Store)
    .select(selectHasRole)
    .pipe(
      map((hasRole) => {
        if (!hasRole) return router.createUrlTree(['/auth']);
        return true;
      })
    );
};
