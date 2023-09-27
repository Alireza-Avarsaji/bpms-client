import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/shared/shared.module';
import { Subscription, tap } from 'rxjs';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';
import { FormErrorMessageModel, QuestionModel } from 'src/app/features/form/models/form.model';
import { AnswerModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { validateSelectionLimitFactory } from './q-multi-select.model';

@Component({
  selector: 'app-q-multi-select',
  templateUrl: './q-multi-select.component.html',
  styleUrls: ['./q-multi-select.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ]
})
export class QMultiSelectComponent {

  @Input() questionData!: QuestionModel;
  @Output() valueChanged = new EventEmitter<AnswerModel>();

  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();
  selectionLimit: number = 0;

  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
    this.subscription = this.onValueChanged().subscribe();
  }

  initForm() {

    this.form = this.fb.group({
      qId: new FormControl(this.questionData.id),
      answer: [null]
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

        case ValidationTypeEnum.max:
          this.setSelectionLimit(+validation.value);
          validations.push(validateSelectionLimitFactory(+validation.value))
          this.formErrorMessages.max = `میتوانید حداکثر ${this.selectionLimit} گزینه را انتخاب کنید`;
          break;
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
  }

  // ? emits new value to parent component
  onValueChanged() {
    return this.form.valueChanges.pipe(
      tap(() => {
        if (this.form.valid) {
          this.valueChanged.emit(this.form.value);
        }
      })
    );
  }

  setSelectionLimit(limit: number) {
    this.selectionLimit = limit;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
