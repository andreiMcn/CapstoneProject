import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddNewTrainingDialogComponent } from '../Dialogs/add-new-training-dialog/add-new-training-dialog.component';
import { EditTrainingDialogComponent } from '../Dialogs/edit-training-dialog/edit-training-dialog.component';
import { NotificationService } from '../Services/NotificationService/notification.service';
import { TrainingService } from '../Services/TrainingService/training.service';
import { compareDates } from '../util-functions';

@Component({
  selector: 'app-manage-trainings',
  templateUrl: './manage-trainings.component.html',
  styleUrls: ['./manage-trainings.component.scss'],
})
export class ManageTrainingsComponent implements OnInit {
  public trainings: any;
  public currentDate = new Date();

  constructor(
    private trainingService: TrainingService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getTrainings();
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

  public addNewTraining(): void {
    const dialogRef = this.dialog.open(AddNewTrainingDialogComponent, {
      width: '830px',
      position: { top: '55px' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'success') {
        setTimeout(() => {
          this.getTrainings();
        }, 100);
      }
    });
  }

  public openEditDialog(training: any): void {
    const dialogRef = this.dialog.open(EditTrainingDialogComponent, {
      width: '830px',
      data: { ...training },
      position: { top: '55px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        setTimeout(() => {
          this.getTrainings();
        }, 100);
      }
    });
  }

  public compareDates(start_date: Date, end_date: Date) {
    return compareDates(start_date, end_date);
  }
}
