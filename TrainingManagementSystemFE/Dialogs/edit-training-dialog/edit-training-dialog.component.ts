import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Services/NotificationService/notification.service';
import { TrainingService } from 'src/app/Services/TrainingService/training.service';

import { EditTrainingControlsEnum } from './edit-training-dialog.enum';

@Component({
  selector: 'app-edit-training-dialog',
  templateUrl: './edit-training-dialog.component.html',
  styleUrls: ['./edit-training-dialog.component.scss'],
})
export class EditTrainingDialogComponent implements OnInit {
  public editTrainingControls = EditTrainingControlsEnum;
  public form = new UntypedFormGroup({});

  constructor(
    private trainingService: TrainingService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<EditTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  public ngOnInit(): void {
    this.addControlsAndValues();
  }

  private addControlsAndValues(): void {
    Object.values(this.editTrainingControls).forEach((control) => {
      this.form.addControl(control, new UntypedFormControl());

      switch (control) {
        case this.editTrainingControls.NAME:
          this.form.get(control)?.setValue(this.dialogData.name);
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editTrainingControls.DESCRIPTION:
          this.form.get(control)?.setValue(this.dialogData.description);
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editTrainingControls.START_DATE:
          this.form
            .get(control)
            ?.setValue(this.dialogData.start_date.split('T')[0]);
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editTrainingControls.END_DATE:
          this.form
            .get(control)
            ?.setValue(this.dialogData.end_date.split('T')[0]);
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editTrainingControls.ADDED_BY:
          this.form.get(control)?.setValue(this.dialogData.added_by);
          break;
        case this.editTrainingControls.ID:
          this.form.get(control)?.setValue(this.dialogData.id);
          break;
      }
    });
  }

  public updateTraining(form: UntypedFormGroup) {
    this.trainingService.updateTraining(form.value).subscribe(
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
