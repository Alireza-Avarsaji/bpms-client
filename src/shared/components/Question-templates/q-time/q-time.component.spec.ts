import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QTimeComponent } from './q-time.component';

describe('QTimeComponent', () => {
  let component: QTimeComponent;
  let fixture: ComponentFixture<QTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QTimeComponent]
    });
    fixture = TestBed.createComponent(QTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
