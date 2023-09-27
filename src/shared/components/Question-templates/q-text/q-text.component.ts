import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, tap } from 'rxjs';
import { FormErrorMessageModel, QuestionModel } from 'src/app/features/form/models/form.model';
import { CommonModule } from '@angular/common';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { AnswerModel } from 'src/app/features/form/models/submission.model';

@Component({
  selector: 'app-q-text',
  templateUrl: './q-text.component.html',
  styleUrls: ['./q-text.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class QTextComponent implements OnInit, OnDestroy {

  @Input() questionData!: QuestionModel;
  @Output() valueChanged = new EventEmitter<AnswerModel>();

  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
    this.subscription = this.onValueChanged().subscribe();

  }

  initForm() {
    this.form = this.fb.group({
      qId: new FormControl(this.questionData.id),
      answer: new FormControl(null)
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
    this.form.get('answer')?.addValidators(validations);
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
