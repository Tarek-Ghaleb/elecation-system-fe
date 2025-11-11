import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private userData: UserDataService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.userData.getUserRoles();
    if (route.data['allowedRoles']?.includes(userRole)) {
      return true;
    } else {
      return false;
    }
  }
}
