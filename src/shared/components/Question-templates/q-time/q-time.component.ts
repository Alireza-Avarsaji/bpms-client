import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Hours, Minutes } from 'src/shared/constants/time';
import { SharedModule } from 'src/shared/shared.module';
import { QTimeValidationModel } from './q-time.model';
import { Subscription } from 'rxjs';
import { FormBasedQuestion } from 'src/app/layout/form/create-form/state/form.state.model';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';

@Component({
  selector: 'app-q-time',
  templateUrl: './q-time.component.html',
  styleUrls: ['./q-time.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class QTimeComponent {


  @Input() data!: FormBasedQuestion<QTimeValidationModel>;
  @Output() valueChanged = new EventEmitter<FormBasedQuestion<QTimeValidationModel>>();
  form!: FormGroup;
  subscription!: Subscription;
  hours = Hours;
  minutes = Minutes;

  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.form.valueChanges.subscribe(value => {
      this.onValueChanged(value as FormBasedQuestion<QTimeValidationModel>);
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: new FormControl(this.data.id ?? null),
      type: new FormControl(this.data.type ?? null),
      key: new FormControl(this.data.key ?? null, [Validators.required]),
      validations: this.fb.group({
        isRequired: new FormControl(this.checkTruthyPipe.transform(this.data.validations?.isRequired)),
        maxH: new FormControl(this.data.validations?.maxH ?? null),
        maxM: new FormControl(this.data.validations?.maxM ?? null),
        minH: new FormControl(this.data.validations?.minH ?? null),
        minM: new FormControl(this.data.validations?.minM ?? null),
      })
    });

  }

  // ? emits new value to parent component
  onValueChanged(value: FormBasedQuestion<QTimeValidationModel>) {
    value.isValid = this.form.valid;
    this.valueChanged.emit(value);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
