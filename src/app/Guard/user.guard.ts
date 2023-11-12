import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenServiceService } from '../Services/user-authen-service.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const userService= inject(UserAuthenServiceService);
  const router = inject(Router);
  if (!userService.isUserLoggedInOrNot) {
    alert("Please return to Login");
    router.navigate(['/login']);
    return false;
  }
  return true;
};
