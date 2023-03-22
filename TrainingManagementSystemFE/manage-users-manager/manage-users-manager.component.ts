import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationResponseDialogComponent } from '../Dialogs/application-response-dialog/application-response-dialog.component';
import { NotificationService } from '../Services/NotificationService/notification.service';
import { TrainingService } from '../Services/TrainingService/training.service';
import { UserService } from '../Services/UserService/user.service';

@Component({
  selector: 'app-manage-users-manager',
  templateUrl: './manage-users-manager.component.html',
  styleUrls: ['./manage-users-manager.component.scss'],
})
export class ManageUsersManagerComponent implements OnInit {
  public users: any;
  public applications: any;
  public attendances: any;
  private currentUser;

  constructor(
    private trainingService: TrainingService,
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.currentUser = this.userService.getUser();
  }

  public ngOnInit(): void {
    this.getUsers();
    this.getApplications();
    this.getAttendance();
  }

  private getUsers(): void {
    this.trainingService.getUsers(this.currentUser.id).subscribe(
      (data: any) => {
        this.users = data;
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  private getApplications(): void {
    this.trainingService.getMyUsersApplications(this.currentUser.id).subscribe(
      (data: any) => {
        this.applications = data;
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  private getAttendance(): void {
    this.trainingService.getMyUsersAttendance(this.currentUser.id).subscribe(
      (data: any) => {
        this.attendances = data;
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public assignUserToManager(user_id: number): void {
    this.trainingService
      .assignUserToManager(this.currentUser.id, user_id)
      .subscribe(
        (data: any) => {
          this.notificationService.showSuccess('Success!');
          this.ngOnInit();
        },
        (error: any) => {
          this.notificationService.showError(error.error);
        }
      );
  }

  public openApplicationResponseDialog(
    application_id: number,
    state: string
  ): void {
    const data = {
      application_id: application_id,
      state: state,
      feedback: '',
    };

    const dialogRef = this.dialog.open(ApplicationResponseDialogComponent, {
      width: '830px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      data.feedback = result;

      this.trainingService.updateUserApplication(data).subscribe(
        (data: any) => {
          this.notificationService.showSuccess('Success!');
          this.ngOnInit();
        },
        (error: any) => {
          this.notificationService.showError(error.error);
        }
      );
    });
  }
}
