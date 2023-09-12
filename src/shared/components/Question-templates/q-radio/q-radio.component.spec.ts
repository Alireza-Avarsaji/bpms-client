import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRadioComponent } from './q-radio.component';


describe('RadioComponent', () => {
  let component: QRadioComponent;
  let fixture: ComponentFixture<QRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRadioComponent]
    });
    fixture = TestBed.createComponent(QRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
