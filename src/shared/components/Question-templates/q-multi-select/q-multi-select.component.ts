import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/shared/shared.module';
import { QMultiSelectValidationModel } from './q-multi-select.model';
import { Subscription } from 'rxjs';
import { FormBasedQuestion } from 'src/app/layout/form/create-form/state/form.state.model';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';

@Component({
  selector: 'app-q-multi-select',
  templateUrl: './q-multi-select.component.html',
  styleUrls: ['./q-multi-select.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    SharedModule
  ]
})
export class QMultiSelectComponent {

  @Input() data!: FormBasedQuestion<QMultiSelectValidationModel>;
  @Output() valueChanged = new EventEmitter<FormBasedQuestion<QMultiSelectValidationModel>>();


  form!: FormGroup;
  subscription!: Subscription;


  constructor(private fb: FormBuilder,private checkTruthyPipe: CheckTruthyPipe) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.form.valueChanges.subscribe(value => {
      this.onValueChanged(value as FormBasedQuestion<QMultiSelectValidationModel>);
    });
  }

  initForm() {
    
    this.form = this.fb.group({
      id: new FormControl(this.data.id ?? null),
      type: new FormControl(this.data.type ?? null),
      key: new FormControl(this.data.key ?? null, [Validators.required]),
      values: new FormControl(this.data.values ?? []),
      validations: this.fb.group({
        isRequired: new FormControl(this.checkTruthyPipe.transform(this.data.validations?.isRequired)),
        max: new FormControl(this.data.validations?.max ?? null),
      })
    });

  }

  removeValue(index: number) {
    const temp = [...this.form.get('values')!.value];
    temp.splice(index, 1);
    this.form.get('values')!.setValue(temp);
  }

  addValue(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if(value) {
      this.form.get('values')!.setValue([...this.form.get('values')!.value, value]);
    }
    event.chipInput!.clear();
  }

  // ? emits new value to parent component
  onValueChanged(value: FormBasedQuestion<QMultiSelectValidationModel>) {
    value.isValid = this.form.valid;
    this.valueChanged.emit(value);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
