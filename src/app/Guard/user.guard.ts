import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenServiceService } from '../Services/user-authen-service.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const userService= inject(UserAuthenServiceService);
  const router = inject(Router);
  if (!userService.isUserLoggedInOrNot) {
    alert("You are not logged in");
    router.navigate(['/userLogin']);
    return false;
  }
  return true;
};
