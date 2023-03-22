import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditUserDialogComponent } from '../Dialogs/edit-user-dialog/edit-user-dialog.component';

import { NavigationService } from '../Services/NavigationService/navigation.service';
import { NotificationService } from '../Services/NotificationService/notification.service';
import { UserService } from '../Services/UserService/user.service';
import { fromBinary } from '../util-functions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public history: string[];
  public activeLink = 'home';
  public currentUserRole = '';
  private routeSubscription: Subscription;

  constructor(
    private navigation: NavigationService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.history = this.navigation.history;
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });
  }

  public ngOnInit(): void {
    if (this.userService.getUser() == null) {
      return;
    }

    this.currentUserRole = this.userService.getUser().user_type;
  }

  public back(): void {
    this.navigation.back();
  }

  public logOut(): void {
    this.userService.logout();
    this.notificationService.showSuccess('Successfully logged out!');
    this.router.navigate(['login']);
  }

  public editProfile():void{

    this.userService.getUser().password = fromBinary(this.userService.getUser().password);
    console.log(this.userService.getUser());
    
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '830px',
      data: { ...this.userService.getUser() },
      position: { top: '55px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.userService.getUserById(this.userService.getUser().id);
      }
    });
  }
}
