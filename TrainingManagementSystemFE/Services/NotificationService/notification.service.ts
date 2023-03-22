import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr:ToastrService) {}

  public showSuccess(message: string){
    this.toastr.success(message);
  }

  public showError(message: string){
    this.toastr.error(message);
  }

  public showInfo(message: string){
    this.toastr.info(message);
  }

  public showWarining(message: string){
    this.toastr.warning(message);
  }
}
