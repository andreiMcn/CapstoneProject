import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../Services/NotificationService/notification.service';
import { UserService } from '../Services/UserService/user.service';
import { LoginControlsEnum } from './login.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form = new UntypedFormGroup({});
  public registerControlsEnum = LoginControlsEnum;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
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
          this.form.get(control)?.setValidators(Validators.required);
          break;
      }
    });
  }

  public login(form: UntypedFormGroup) {
    this.userService.login(form.value).subscribe(
      (data: any) => {
        this.userService.setIsUserLoggedIn(true);
        this.userService.setUser(data);
        this.notificationService.showSuccess(
          'You have been successfully logged in!'
        );
        this.router.navigate(['home']);
      },
      (error: any) => {
        this.notificationService.showError(error.error);
      }
    );
  }
}
