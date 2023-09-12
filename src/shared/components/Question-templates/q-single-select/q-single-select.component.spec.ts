import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QSingleSelectComponent } from './q-single-select.component';

describe('QSingleSelectComponent', () => {
  let component: QSingleSelectComponent;
  let fixture: ComponentFixture<QSingleSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QSingleSelectComponent]
    });
    fixture = TestBed.createComponent(QSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
