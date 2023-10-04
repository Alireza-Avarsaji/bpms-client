import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/shared/shared.module';
import { QRadioValidationModel } from './q-radio.model';
import { Subscription, tap } from 'rxjs';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { AnswerModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';

@Component({
  selector: 'app-q-radio',
  templateUrl: './q-radio.component.html',
  styleUrls: ['./q-radio.component.scss'],
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
export class QRadioComponent {

  @Input() questionData!: QuestionModel;
  @Output() valueChanged = new EventEmitter<AnswerModel>();

  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();

  constructor(private fb: FormBuilder,private checkTruthyPipe: CheckTruthyPipe) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.onValueChanged().subscribe();
    this.setValidations();
  }

  initForm() {
    this.form = this.fb.group({
      qId: new FormControl(this.questionData.id),
      answer: new FormControl()
    });
  }

  setValidations() {
    const validations = [];
    for (const validation of this.questionData.validations) {
      switch (validation.type) {
        case ValidationTypeEnum.isRequired:
          validations.push(Validators.required);
          this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          break;
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
    this.form.get('answer')?.setValue(false);
  }

  // ? emits new value to parent component
  onValueChanged() {
    return this.form.valueChanges.pipe(
      tap(() => {
        if(this.form.valid) {
          this.valueChanged.emit(this.form.value);
        }
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
