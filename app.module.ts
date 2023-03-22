import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNewUserDialogComponent } from './Dialogs/add-new-user-dialog/add-new-user-dialog.component';
import { EditUserDialogComponent } from './Dialogs/edit-user-dialog/edit-user-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageTrainingsComponent } from './manage-trainings/manage-trainings.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { TrainingManagementGuard } from './Services/TrainingManagementGuardService/training-management-guard.service';
import { AddNewTrainingDialogComponent } from './Dialogs/add-new-training-dialog/add-new-training-dialog.component';
import { EditTrainingDialogComponent } from './Dialogs/edit-training-dialog/edit-training-dialog.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ManageUsersManagerComponent } from './manage-users-manager/manage-users-manager.component';
import { ApplicationResponseDialogComponent } from './Dialogs/application-response-dialog/application-response-dialog.component';
import { AttendanceFeedbackDialogComponent } from './Dialogs/attendance-feedback-dialog/attendance-feedback-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ManageUsersComponent,
    EditUserDialogComponent,
    AddNewUserDialogComponent,
    ManageTrainingsComponent,
    AddNewTrainingDialogComponent,
    EditTrainingDialogComponent,
    ViewApplicationsComponent,
    ManageUsersManagerComponent,
    ApplicationResponseDialogComponent,
    AttendanceFeedbackDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    OrderModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    TrainingManagementGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
