import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { QRangeValidationModel } from './q-range.model';
import { Subscription } from 'rxjs';
import { FormBasedQuestion } from 'src/app/layout/form/create-form/state/form.state.model';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';

@Component({
  selector: 'app-q-range',
  templateUrl: './q-range.component.html',
  styleUrls: ['./q-range.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule
  ]
})
export class QRangeComponent {

  @Input() data!: FormBasedQuestion<QRangeValidationModel>;
  @Output() valueChanged = new EventEmitter<FormBasedQuestion<QRangeValidationModel>>();
  form!: FormGroup;
  subscription!: Subscription;


  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.form.valueChanges.subscribe(value => {
      this.onValueChanged(value as FormBasedQuestion<QRangeValidationModel>);
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: new FormControl(this.data.id ?? null),
      type: new FormControl(this.data.type ?? null),
      key: new FormControl(this.data.key ?? null, [Validators.required]),
      validations: this.fb.group({
        isRequired: new FormControl(this.checkTruthyPipe.transform(this.data.validations?.isRequired)),
        max: new FormControl(this.data.validations?.max ?? null),
        min: new FormControl(this.data.validations?.min ?? null),
      })
    });

  }

  // ? emits new value to parent component
  onValueChanged(value: FormBasedQuestion<QRangeValidationModel>) {
    value.isValid = this.form.valid;
    this.valueChanged.emit(value);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
