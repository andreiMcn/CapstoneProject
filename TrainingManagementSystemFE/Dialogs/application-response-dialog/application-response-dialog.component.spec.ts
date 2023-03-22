import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationResponseDialogComponent } from './application-response-dialog.component';

describe('ApplicationResponseDialogComponent', () => {
  let component: ApplicationResponseDialogComponent;
  let fixture: ComponentFixture<ApplicationResponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationResponseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
