import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceFeedbackDialogComponent } from '../Dialogs/attendance-feedback-dialog/attendance-feedback-dialog.component';
import { NotificationService } from '../Services/NotificationService/notification.service';

import { TrainingService } from '../Services/TrainingService/training.service';
import { UserService } from '../Services/UserService/user.service';
import { compareDates } from '../util-functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public trainings: any;
  public currentUserRole = '';
  public currentDate = new Date();

  constructor(
    private trainingService: TrainingService,
    private notificationService: NotificationService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    if (this.userService.getUser() == null) {
      return;
    }

    this.currentUserRole = this.userService.getUser().user_type;
  }

  public ngOnInit(): void {
    if (this.userService.getUser().user_type === 'Employee') {
      this.getTrainingsUser();
    } else {
      this.getTrainings();
    }
  }

  public getTrainings(): void {
    this.trainingService.getAllTrainings().subscribe(
      (data: any) => {
        this.trainings = data;
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public getTrainingsUser(): void {
    this.trainingService
      .getTrainingsWithApplications(this.userService.getUser().id)
      .subscribe(
        (data: any) => {
          this.trainings = data;
          console.log(this.trainings);
        },
        (error: any) => {
          this.notificationService.showError(error.error);
        }
      );
  }

  public applyForTraining(trainingId: number) {
    this.userService.applyForTraining(trainingId).subscribe(
      (data: any) => {
        this.notificationService.showSuccess('You successfully applied!');
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public showReason(training: any) {
    this.notificationService.showInfo(
      'Reason: ' + training.training_application[0].response
    );
  }

  public cancelApplication(training_id: number) {
    this.userService.cancelApplication(training_id).subscribe(
      (data: any) => {
        this.notificationService.showSuccess(
          'You successfully removed your application!'
        );
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public setAttendance(training: any): void {
    const data = {
      user_id: this.userService.getUser().id,
      training_id: training.id,
      attendance: new Date(),
      feedback: '',
    };

    const dialogRef = this.dialog.open(AttendanceFeedbackDialogComponent, {
      width: '830px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      data.feedback = result;
      this.trainingService.addAttendance(data).subscribe(
        (data: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.notificationService.showError(error.error);
        }
      );
    });
  }

  public checkIfAlreadyAttendedToday(training: any): boolean {
    var returnValue = false;
    training.training_attendance.forEach((element: any) => {
      if (
        element.attendance.split('T')[0] ==
        new Date().toISOString().split('T')[0]
      )
        returnValue = true;
    });

    return returnValue;
  }

  public compareDates(start_date: Date, end_date: Date) {
    return compareDates(start_date, end_date);
  }
}
