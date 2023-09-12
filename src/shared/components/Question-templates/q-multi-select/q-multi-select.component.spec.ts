import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMultiSelectComponent } from './q-multi-select.component';

describe('QMultiSelectComponent', () => {
  let component: QMultiSelectComponent;
  let fixture: ComponentFixture<QMultiSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QMultiSelectComponent]
    });
    fixture = TestBed.createComponent(QMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
