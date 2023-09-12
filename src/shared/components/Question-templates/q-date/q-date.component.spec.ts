import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QDateComponent } from './q-date.component';

describe('QDateComponent', () => {
  let component: QDateComponent;
  let fixture: ComponentFixture<QDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QDateComponent]
    });
    fixture = TestBed.createComponent(QDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
