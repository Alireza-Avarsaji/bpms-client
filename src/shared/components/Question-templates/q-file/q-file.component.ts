import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileFormats } from 'src/shared/constants/fileFormat';
import { SharedModule } from 'src/shared/shared.module';
import { QFileValidationModel } from './q-file.model';
import { Subscription } from 'rxjs';
import { FormBasedQuestion } from 'src/app/layout/form/create-form/state/form.state.model';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';

@Component({
  selector: 'app-q-file',
  templateUrl: './q-file.component.html',
  styleUrls: ['./q-file.component.scss'],
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
export class QFileComponent {


  @Input() data!: FormBasedQuestion<QFileValidationModel>;
  @Output() valueChanged = new EventEmitter<FormBasedQuestion<QFileValidationModel>>();
  form!: FormGroup;
  subscription!: Subscription;
  fileFormats = FileFormats;


  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.form.valueChanges.subscribe(value => {
      this.onValueChanged(value as FormBasedQuestion<QFileValidationModel>);
    });
  }

  initForm() {


    this.form = this.fb.group({
      id: new FormControl(this.data.id ?? null),
      type: new FormControl(this.data.type ?? null),
      key: new FormControl(this.data.key ?? null, [Validators.required]),
      validations: this.fb.group({
        isRequired: new FormControl(this.checkTruthyPipe.transform(this.data.validations?.isRequired)),
        maxSize: new FormControl(this.data.validations?.maxSize ?? null),
        extension: new FormControl(this.data.validations?.extension ?? null),
      })
    });

  }


  // ? emits new value to parent component
  onValueChanged(value: FormBasedQuestion<QFileValidationModel>) {
    value.isValid = this.form.valid;
    this.valueChanged.emit(value);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
