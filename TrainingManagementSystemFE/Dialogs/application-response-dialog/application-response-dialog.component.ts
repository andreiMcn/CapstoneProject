import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-response-dialog',
  templateUrl: './application-response-dialog.component.html',
  styleUrls: ['./application-response-dialog.component.scss'],
})
export class ApplicationResponseDialogComponent {
  public feedback: string = '';

  constructor(private dialogRef: MatDialogRef<ApplicationResponseDialogComponent>) {}

  public closeDialog(feedback: string): void {
    this.dialogRef.close(feedback);
  }
}
