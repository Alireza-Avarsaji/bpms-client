import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/shared/shared.module';
import { FormErrorMessageModel, QuestionModel } from 'src/app/features/form/models/form.model';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-q-single-select',
  templateUrl: './q-single-select.component.html',
  styleUrls: ['./q-single-select.component.scss'],
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
export class QSingleSelectComponent {

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
        default: continue;
      }
    }
    this.form.get('answer')?.addValidators(validations);
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
