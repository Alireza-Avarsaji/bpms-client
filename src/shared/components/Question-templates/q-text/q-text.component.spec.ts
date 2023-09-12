import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QTextComponent } from './q-text.component';

describe('QTextComponent', () => {
  let component: QTextComponent;
  let fixture: ComponentFixture<QTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QTextComponent]
    });
    fixture = TestBed.createComponent(QTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
