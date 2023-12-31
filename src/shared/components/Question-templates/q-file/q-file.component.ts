import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/shared/shared.module';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { UpdateStepperActionModel } from 'src/app/features/form/models/submission.model';
import { ValidationTypeEnum } from 'src/app/features/form/models/form.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-q-file',
  templateUrl: './q-file.component.html',
  styleUrls: ['./q-file.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule
  ]
})
export class QFileComponent {


  @Input() questionData!: QuestionModel;
  @Input() currentStep!: number;
  @Input() totalSteps!: number;
  @Output() stepChanged = new EventEmitter<UpdateStepperActionModel>();


  form!: FormGroup;
  formErrorMessages = new FormErrorMessageModel();
  maxLimit: number = 0;
  extension: string = '';
  fileName: string = '';


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
          if(validation.value != 'false'){
            validations.push(Validators.required);
            this.formErrorMessages.isRequired = 'وارد کردن پاسخ الزامی است';
          }
          break;
        case ValidationTypeEnum.max:
          this.maxLimit = +validation.value;
          break;
        case ValidationTypeEnum.extension:
          this.extension = validation.value;
          break;
        default: continue;
      }
    }
    this.form.get('answerValue')?.addValidators(validations);
  }


  readFile(event: any): void {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    this.fileName = file.name;

    if (file.size > this.maxLimit*1000000) {
      this.form.setErrors({ max: `حجم فایل نباید بیشتر از ${this.maxLimit} باشد` })
      return;
    }

    const pattern = `${this.extension}-*`;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.form.setErrors({ extension: `فرمت فایل باید ${this.extension} باشد` });
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    const reader = e.target;
    this.form.get('answerValue')?.setValue(reader.result as string);
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
