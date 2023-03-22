import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersManagerComponent } from './manage-users-manager.component';

describe('ManageUsersManagerComponent', () => {
  let component: ManageUsersManagerComponent;
  let fixture: ComponentFixture<ManageUsersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
