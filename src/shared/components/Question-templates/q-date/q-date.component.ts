import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from 'src/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-q-date',
  templateUrl: './q-date.component.html',
  styleUrls: ['./q-date.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class QDateComponent {


  @Input() questionData!: QuestionModel;
  @Input() currentStep!: number;
  @Input() totalSteps!: number;
  @Output() stepChanged = new EventEmitter<UpdateStepperActionModel>();


  form!: FormGroup;
  formErrorMessages = new FormErrorMessageModel();
  maxDate!: Date;
  minDate!: Date;

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
          if(validation.value != 'false') {
            validations.push(Validators.required);
            this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          }
          break;
        case ValidationTypeEnum.max:
          this.maxDate = new Date(validation.value);
          // validations.push(Validators.max(new Date(validation.value)));
          this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          break;
        case ValidationTypeEnum.min:
          // validations.push(Validators.required);
          this.minDate = new Date(validation.value);
          this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          break;
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
  }


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent Saturday and Sunday from being selected.
    return day > this.minDate && day < this.maxDate;
  };

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
