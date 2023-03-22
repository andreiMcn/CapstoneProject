import { trigger } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageTrainingsComponent } from './manage-trainings/manage-trainings.component';
import { ManageUsersManagerComponent } from './manage-users-manager/manage-users-manager.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RegisterComponent } from './register/register.component';
import { TrainingManagementGuard } from './Services/TrainingManagementGuardService/training-management-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      showHeader: false,
      showFooter: false,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      showHeader: false,
      showFooter: false,
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [TrainingManagementGuard],
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    canActivate: [TrainingManagementGuard],
  },
  {
    path: 'manage-trainings',
    component: ManageTrainingsComponent,
    canActivate: [TrainingManagementGuard],
  },
  {
    path: 'manage-users-manager',
    component: ManageUsersManagerComponent,
    canActivate: [TrainingManagementGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
