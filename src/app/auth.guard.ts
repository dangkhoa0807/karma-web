import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (token) {
    const userInfor = await authService.getUser();

    if (userInfor) {
      // Check if the route requires admin access
      const requiresAdmin = route.data && route.data['requiresAdmin'];

      if (requiresAdmin && userInfor.isAdmin === 1) {
        return true; // Allow access to admin route
      } else if (!requiresAdmin) {
        return true; // Allow access to non-admin routes
      }
    }
  }

  router.navigateByUrl('/login');
  return false;
};
