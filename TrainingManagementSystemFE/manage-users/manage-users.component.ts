import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../Dialogs/add-new-user-dialog/add-new-user-dialog.component';
import { EditUserDialogComponent } from '../Dialogs/edit-user-dialog/edit-user-dialog.component';

import { NotificationService } from '../Services/NotificationService/notification.service';
import { UserService } from '../Services/UserService/user.service';
import { fromBinary } from '../util-functions';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  public users: any;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getAllUsersByHR().subscribe(
      (data: any) => {
        this.users = data;

        this.users.forEach((user: any) => {
          user.password = fromBinary(user.password);
        });
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '830px',
      data: { ...user },
      position: { top: '55px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        setTimeout(() => {
          this.getUsers();
        }, 100);
      }
    });
  }

  public addNewUser(): void {
    const dialogRef = this.dialog.open(AddNewUserDialogComponent, {
      width: '830px',
      position: { top: '55px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        setTimeout(() => {
          this.getUsers();
        }, 100);
      }
    });
  }
}
