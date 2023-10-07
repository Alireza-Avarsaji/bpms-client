import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-q-range',
  templateUrl: './q-range.component.html',
  styleUrls: ['./q-range.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule,
    MatButtonModule
  ]
})
export class QRangeComponent {

  @Input() questionData!: QuestionModel;
  @Input() currentStep!: number;
  @Input() totalSteps!: number;
  @Output() stepChanged = new EventEmitter<UpdateStepperActionModel>();


  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();
  maxLimit: number = 0;
  minLimit: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValidations();
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
          if(validation.value != 'false'){
            validations.push(Validators.required);
            this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          }
          break;
        case ValidationTypeEnum.max:
        this.maxLimit = +validation.value;
          break;
        case ValidationTypeEnum.min:
          this.minLimit = +validation.value;  
          this.form.get('answer')?.setValue(this.minLimit);
          break;
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
  }


  formatLabel(value: number): string {
    return value.toString();
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
