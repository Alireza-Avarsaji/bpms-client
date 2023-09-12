import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QFileComponent } from './q-file.component';

describe('QFileComponent', () => {
  let component: QFileComponent;
  let fixture: ComponentFixture<QFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QFileComponent]
    });
    fixture = TestBed.createComponent(QFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
