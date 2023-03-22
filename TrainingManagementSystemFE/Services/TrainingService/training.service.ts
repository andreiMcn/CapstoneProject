import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../UserService/user.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private baseUrl = 'https://localhost:7240';

  constructor(private userService: UserService, private http: HttpClient) {}

  public getAllTrainings(): any {
    return this.http.get<any>(`${this.baseUrl}/Trainings/get-all-trainings`);
  }

  public createTraining(form: any): any {
    const newTraining = form;
    form.added_by = this.userService.getUser().id;
    form.start_date = new Date(form.start_date);
    form.end_date = new Date(form.end_date);

    return this.http.post<any>(`${this.baseUrl}/Trainings`, {
      ...newTraining,
    });
  }

  public updateTraining(form: any): any {
    const newTraining = form;
    form.start_date = new Date(form.start_date);
    form.end_date = new Date(form.end_date);

    return this.http.patch<any>(`${this.baseUrl}/Trainings/edit-training`, {
      ...newTraining,
    });
  }

  public addAttendance(data: any): any {
    return this.http.post<any>(`${this.baseUrl}/Trainings/add-attendance`, {
      ...data,
    });
  }

  public getTrainingsWithApplications(id: number): any {
    return this.http.get<any>(
      `${this.baseUrl}/Trainings/get-training-with-application?id=${
        this.userService.getUser().id
      }`
    );
  }

  public getUsers(id: number): any {
    return this.http.get<any>(
      `${this.baseUrl}/Manager/get-my-users?manager_id=${
        this.userService.getUser().id
      }`
    );
  }

  public assignUserToManager(manager_id: number, user_id: number): any {
    return this.http.patch<any>(
      `${this.baseUrl}/Manager/assign-user-to-manager?manager_id=${manager_id}&user_id=${user_id}`,
      null
    );
  }

  public getMyUsersApplications(manager_id: number): any {
    return this.http.get<any>(
      `${this.baseUrl}/Manager/get-my-users-applications?manager_id=${manager_id}`
    );
  }

  public getMyUsersAttendance(manager_id: number): any {
    return this.http.get<any>(
      `${this.baseUrl}/Manager/get-my-users-attendance?manager_id=${manager_id}`
    );
  }

  public updateUserApplication(data: any): any {
    return this.http.patch<any>(
      `${this.baseUrl}/Manager/set-application-response`,
      { ...data }
    );
  }
}
