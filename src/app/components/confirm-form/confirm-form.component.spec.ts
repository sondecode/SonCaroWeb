import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFormComponent } from './confirm-form.component';

describe('ConfirmFormComponent', () => {
  let component: ConfirmFormComponent;
  let fixture: ComponentFixture<ConfirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
