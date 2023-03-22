import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendance-feedback-dialog',
  templateUrl: './attendance-feedback-dialog.component.html',
  styleUrls: ['./attendance-feedback-dialog.component.scss'],
})
export class AttendanceFeedbackDialogComponent {
  public feedback: string = '';

  constructor(
    private dialogRef: MatDialogRef<AttendanceFeedbackDialogComponent>
  ) {}

  public closeDialog(feedback: string): void {
    this.dialogRef.close(feedback);
  }
}
