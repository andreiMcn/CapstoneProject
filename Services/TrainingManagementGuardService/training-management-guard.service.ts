import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../UserService/user.service';

@Injectable()
export class TrainingManagementGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.getIsUserLoggedIn() === true) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
