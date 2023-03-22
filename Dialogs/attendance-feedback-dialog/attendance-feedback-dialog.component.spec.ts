import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceFeedbackDialogComponent } from './attendance-feedback-dialog.component';

describe('AttendanceFeedbackDialogComponent', () => {
  let component: AttendanceFeedbackDialogComponent;
  let fixture: ComponentFixture<AttendanceFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceFeedbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
