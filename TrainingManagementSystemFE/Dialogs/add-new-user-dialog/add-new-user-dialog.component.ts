import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EditUserControlsEnum } from '../edit-user-dialog/edit-user-dialog.enum';
import { NotificationService } from '../../Services/NotificationService/notification.service';
import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.scss'],
})
export class AddNewUserDialogComponent {
  public editUserControlsEnum = EditUserControlsEnum;
  public form = new UntypedFormGroup({});

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddNewUserDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.addControls();
  }

  private addControls(): void {
    Object.values(this.editUserControlsEnum).forEach((control) => {
      this.form.addControl(control, new UntypedFormControl());

      switch (control) {
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
          break;
        case this.editUserControlsEnum.PASSWORD:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.DATE_OF_BIRTH:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.FIRST_NAME:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.LAST_NAME:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.PHONE_NUMBER:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.ADDRESS:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.USER_TYPE:
          this.form.get(control)?.setValidators(Validators.required);
          break;
        case this.editUserControlsEnum.STATUS:
          this.form.get(control)?.setValidators(Validators.required);
          break;
      }
    });
  }

  public addUser(form: UntypedFormGroup): void {
    this.userService.createUserByHR(form.value).subscribe(
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
