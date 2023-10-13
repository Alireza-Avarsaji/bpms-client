import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormErrorMessageModel, QuestionModel } from 'src/app/features/form/models/form.model';
import { CommonModule } from '@angular/common';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-q-text',
  templateUrl: './q-text.component.html',
  styleUrls: ['./q-text.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule
  ]
})
export class QTextComponent implements OnInit {

  @Input() questionData!: QuestionModel;
  @Input() currentStep!: number;
  @Input() totalSteps!: number;
  @Output() stepChanged = new EventEmitter<UpdateStepperActionModel>();

  form!: FormGroup;
  formErrorMessages = new FormErrorMessageModel();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
  }

  initForm() {
    this.form = this.fb.group({
      questionId: new FormControl(this.questionData.id),
      answerValue: new FormControl(null)
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
          validations.push(Validators.maxLength(+validation.value));
          this.formErrorMessages.max = `طول پاسخ نباید بیشتر از ${validation.value} باشد`;
          break;
        case ValidationTypeEnum.min:
          validations.push(Validators.minLength(+validation.value));
          this.formErrorMessages.min = `طول پاسخ نباید کمتر از ${validation.value} باشد`;
          break;
        case ValidationTypeEnum.regex:
          validations.push(Validators.pattern(validation.value));
          this.formErrorMessages.regex = 'فرمت پاسخ صحیح نیست'
          break;
        default: continue;
      }
    }
    this.form.get('answerValue')?.addValidators(validations);
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

  submitSubmission() {
    this.stepChanged.emit({
      movement: 'submit',
      answer: this.form.value
    });
  }


}
