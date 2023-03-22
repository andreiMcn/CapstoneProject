import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { TrainingService } from 'src/app/Services/TrainingService/training.service';
import { AddTrainingControlsEnum } from './add-new-training-dialog.enum';

@Component({
  selector: 'app-add-new-training-dialog',
  templateUrl: './add-new-training-dialog.component.html',
  styleUrls: ['./add-new-training-dialog.component.scss'],
})
export class AddNewTrainingDialogComponent implements OnInit {
  public addTrainingControls = AddTrainingControlsEnum;
  public form = new UntypedFormGroup({});

  constructor(
    private trainingService: TrainingService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddNewTrainingDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.addControls();
  }

  private addControls(): void {
    Object.values(this.addTrainingControls).forEach((control) => {
      this.form.addControl(control, new UntypedFormControl());

      switch (control) {
        case this.addTrainingControls.NAME:
        case this.addTrainingControls.DESCRIPTION:
        case this.addTrainingControls.START_DATE:
        case this.addTrainingControls.END_DATE:
          this.form.get(control)?.setValidators(Validators.required);

          break;
      }
    });
  }

  public addTraining(form: UntypedFormGroup) {
    this.trainingService.createTraining(form.value).subscribe(
      (data: any) => {
        this.notificationService.showSuccess('Success!');
        this.dialogRef.close('success');
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }
}
