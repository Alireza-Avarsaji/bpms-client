import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/shared/shared.module';
import { Subscription, tap } from 'rxjs';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { AnswerModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { Hours, Minutes } from 'src/shared/constants/time';
import { validateTimeLimitFactory } from './q-time.model';

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


  @Input() questionData!: QuestionModel;
  @Output() valueChanged = new EventEmitter<AnswerModel>();

  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();
  hours = Hours;
  minutes = Minutes;
  maxH!: number;
  minH!: number;
  maxM!: number;
  minM!: number;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
    this.subscription = this.onValueChanged().subscribe();
  }

  initForm() {
    this.form = this.fb.group({
      qId: new FormControl(this.questionData.id),
      hour: new FormControl(null),
      minute: new FormControl(null),
      answer: new FormControl(null)
    });

  }

  setValidations() {
    for (const validation of this.questionData.validations) {
      switch (validation.type) {
        case ValidationTypeEnum.isRequired:
          this.form.get('hour')?.addValidators([Validators.required]);
          this.form.get('minute')?.addValidators([Validators.required]);
          this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          break;
        case ValidationTypeEnum.maxH:
          this.maxH = +validation.value;
          break;
        case ValidationTypeEnum.maxM:
          this.maxM = +validation.value;
          break;
        case ValidationTypeEnum.minH:
          this.minH = +validation.value;
          break;
        case ValidationTypeEnum.minM:
          this.minM = +validation.value;
          break;
        default: continue;
      }
    }
    const timeLimitValidation = validateTimeLimitFactory(this.maxH, this.minH, this.maxM, this.minM);
    this.form.addValidators(timeLimitValidation);
  }



  // ? emits new value to parent component
  onValueChanged() {

    return this.form.valueChanges.pipe(
      tap(() => {
        if (this.form.valid) {
          const formValue: AnswerModel = {
            qId: this.form.value.qId,
            value: this.form.value.hour + ':' + this.form.value.minute
          }
          this.valueChanged.emit(formValue);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
