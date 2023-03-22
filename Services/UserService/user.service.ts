import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:7240';
  private currentUser: any;
  private isUserLoggedIn = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser') == null) {
      return;
    }

    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
    }
    this.isUserLoggedIn = localStorage.getItem('currentUser') !== null;
  }

  public getUserById(id: number){
    return this.http.get<any>(`${this.baseUrl}/Users/get-user-by-id?id=${id}`);
  }

  public setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value;
  }

  public getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  public setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  public getUser(): any {
    return this.currentUser;
  }

  public createUser(form: any): any {
    const newUser = form.value;
    delete form.value.password_confirm;
    form.value.user_type = 'Employee';
    form.value.date_of_birth = new Date(form.value.date_of_birth);

    return this.http.post<any>(`${this.baseUrl}/Users`, {
      ...newUser,
    });
  }

  public createUserByHR(form: any): any {
    const newUser = form;
    form.date_of_birth = new Date(form.date_of_birth);
    form.is_deleted = form.is_deleted === 'true' ? true : false;
    delete form.id;

    return this.http.post<any>(`${this.baseUrl}/Users`, {
      ...newUser,
    });
  }

  public login(data: any): any {
    return this.http.get<any>(
      `${this.baseUrl}/Users/Login?email_address=${data.email_address}&password=${data.password}`
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.isUserLoggedIn = false;
  }

  public getAllUsersByHR(): any {
    return this.http.get<any>(`${this.baseUrl}/HR/get-all-users`);
  }

  public editUserByHR(editedUser: any): any {
    editedUser.date_of_birth = new Date(editedUser.date_of_birth);
    editedUser.is_deleted = editedUser.is_deleted === 'true' ? true : false;

    return this.http.patch<any>(`${this.baseUrl}/HR/edit-user`, {
      ...editedUser,
    });
  }

  public applyForTraining(trainingId: number): any {
    const newTrainingApplicance = {
      user_id: this.getUser().id,
      training_id: trainingId,
      state: 'Pending',
    };

    return this.http.post<any>(`${this.baseUrl}/Users/apply-for-training`, {
      ...newTrainingApplicance,
    });
  }

  public cancelApplication(trainingId: number): any {
    return this.http.delete<any>(
      `${this.baseUrl}/Users/cancel-training-application?training_id=${trainingId}`
    );
  }
}
