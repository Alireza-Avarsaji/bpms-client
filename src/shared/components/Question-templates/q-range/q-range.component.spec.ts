import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRangeComponent } from './q-range.component';

describe('QRangeComponent', () => {
  let component: QRangeComponent;
  let fixture: ComponentFixture<QRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRangeComponent]
    });
    fixture = TestBed.createComponent(QRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
