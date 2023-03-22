import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../Services/NotificationService/notification.service';
import { UserService } from '../Services/UserService/user.service';

import { RegisterControlsEnum } from './register.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form = new UntypedFormGroup({});
  public registerControlsEnum = RegisterControlsEnum;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.addControls();
  }

  private addControls(): void {
    Object.values(this.registerControlsEnum).forEach((control) => {
      this.form.addControl(control, new UntypedFormControl());

      switch (control) {
        case this.registerControlsEnum.EMAIL:
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
        case this.registerControlsEnum.PASSWORD:
        case this.registerControlsEnum.PASSWORD_CONFIRM:
        case this.registerControlsEnum.FIRST_NAME:
        case this.registerControlsEnum.LAST_NAME:
        case this.registerControlsEnum.PHONE_NUMBER:
        case this.registerControlsEnum.ADDRESS:
          this.form.get(control)?.setValidators(Validators.required);
          break;
      }
    });
  }

  public verifyPasswords(): boolean {
    return (
      this.getControl(this.registerControlsEnum.PASSWORD).value !=
        this.getControl(this.registerControlsEnum.PASSWORD_CONFIRM).value &&
      this.getControl(this.registerControlsEnum.PASSWORD).touched == true &&
      this.getControl(this.registerControlsEnum.PASSWORD_CONFIRM).touched ==
        true
    );
  }

  public async sendForm(form: UntypedFormGroup): Promise<void> {
    this.userService.createUser(form).subscribe(
      (data: any) => {
        this.router.navigate(['login']);
        this.notificationService.showSuccess(
          'Your account has been successfully created!'
        );
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }

  public getControl(key: string): AbstractControl {
    return this.form.controls[key];
  }
}
