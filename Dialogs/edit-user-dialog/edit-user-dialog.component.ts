import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NotificationService } from '../../Services/NotificationService/notification.service';
import { UserService } from '../../Services/UserService/user.service';
import { EditUserControlsEnum } from './edit-user-dialog.enum';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
  public editUserControlsEnum = EditUserControlsEnum;
  public form = new UntypedFormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private notificationService: NotificationService,
    public userService: UserService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.addControlsAndValues();
  }

  private addControlsAndValues(): void {
    Object.values(this.editUserControlsEnum).forEach((control) => {
      this.form.addControl(control, new UntypedFormControl());

      switch (control) {
        case this.editUserControlsEnum.ID:
          this.form.get(control)?.setValue(this.dialogData.id);
          break;
        case this.editUserControlsEnum.MANAGER_ID:
          this.form.get(control)?.setValue(this.dialogData.manager_id);
          break;
        case this.editUserControlsEnum.EMAIL:
          this.form
            .get(control)
            ?.setValidators(
              Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              ])
            );
          this.form.get(control)?.setValue(this.dialogData.email_address);
          break;
        case this.editUserControlsEnum.PASSWORD:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.password);
          break;
        case this.editUserControlsEnum.DATE_OF_BIRTH:
          this.form
            .get(control)
            ?.setValue(this.dialogData.date_of_birth.split('T')[0]);
          break;
        case this.editUserControlsEnum.FIRST_NAME:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.first_name);
          break;
        case this.editUserControlsEnum.LAST_NAME:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.last_name);
          break;
        case this.editUserControlsEnum.PHONE_NUMBER:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.phone_number);
          break;
        case this.editUserControlsEnum.ADDRESS:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.address);
          break;
        case this.editUserControlsEnum.USER_TYPE:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.user_type);
          break;
        case this.editUserControlsEnum.STATUS:
          this.form.get(control)?.setValidators(Validators.required);
          this.form.get(control)?.setValue(this.dialogData.is_deleted);
          break;
      }
    });
  }

  public editUser(form: UntypedFormGroup): void {
    this.userService.editUserByHR(form.value).subscribe(
      (data: any) => {
        this.userService.setUser(data);
        this.notificationService.showSuccess('Success!');
        this.dialogRef.close('success');
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }
}
