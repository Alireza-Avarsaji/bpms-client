import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/shared/shared.module';
import { FormErrorMessageModel, QuestionModel } from 'src/app/features/form/models/form.model';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { validateSelectionLimitFactory } from './q-multi-select.model';
import { MatButtonModule } from '@angular/material/button';

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
    SharedModule,
    MatButtonModule
  ]
})
export class QMultiSelectComponent {

  @Input() questionData!: QuestionModel;
  @Input() currentStep!: number;
  @Input() totalSteps!: number;
  @Output() stepChanged = new EventEmitter<UpdateStepperActionModel>();


  form!: FormGroup;
  formErrorMessages = new FormErrorMessageModel();
  selectionLimit: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
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
          if (validation.value != 'false') {
            validations.push(Validators.required);
            this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          }
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


  setSelectionLimit(limit: number) {
    this.selectionLimit = limit;
  }

  nextStep() {
    this.stepChanged.emit({
      movement: 'next',
      answer: this.form.value
    });
  }

  priviousStep() {
    this.stepChanged.emit({
      movement: 'previous'
    });
  }


}
