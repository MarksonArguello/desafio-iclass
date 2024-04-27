import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthenticationService).isLoggedIn()) {
    return true;
  }

  inject(Router).navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
