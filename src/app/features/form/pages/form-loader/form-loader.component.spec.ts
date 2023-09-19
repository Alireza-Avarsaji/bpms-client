import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoaderComponent } from './form-loader.component';

describe('FormLoaderComponent', () => {
  let component: FormLoaderComponent;
  let fixture: ComponentFixture<FormLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLoaderComponent]
    });
    fixture = TestBed.createComponent(FormLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
