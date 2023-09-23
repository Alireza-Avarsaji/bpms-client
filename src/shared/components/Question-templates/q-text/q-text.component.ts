import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QTextValidationModel } from './q-text.models';
import { Subscription } from 'rxjs';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';
import { FormBasedQuestion, QuestionModel, ValidationTypeEnum } from 'src/app/features/form/models/form.model';

@Component({
  selector: 'app-q-text',
  templateUrl: './q-text.component.html',
  styleUrls: ['./q-text.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ]
})
export class QTextComponent implements OnInit, OnDestroy {

  @Input() questionData!: QuestionModel;
  @Output() valueChanged = new EventEmitter<FormBasedQuestion<QTextValidationModel>>();

  form!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
    // this.subscription = this.form.valueChanges.subscribe(value => {
    //   this.onValueChanged(value as FormBasedQuestion<QTextValidationModel>);
    // });
  }

  initForm() {
    this.form = this.fb.group({
      answer: new FormControl(null)
    });
  }

  setValidations() {
    const validations = [];
    for (const validation of this.questionData.validations) {
      switch (validation.type) {
        case ValidationTypeEnum.max:
          validations.push(Validators.maxLength(+validation.value));
          break;
        case ValidationTypeEnum.min:
          validations.push(Validators.minLength(+validation.value));
          break;
        case ValidationTypeEnum.regex:
          validations.push(Validators.pattern(validation.value))
          break;
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
  }

  // ? emits new value to parent component
  onValueChanged(value: FormBasedQuestion<QTextValidationModel>) {
    value.isValid = this.form.valid;
    this.valueChanged.emit(value);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
