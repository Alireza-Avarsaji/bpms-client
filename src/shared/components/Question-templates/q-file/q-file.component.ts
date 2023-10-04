import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/shared/shared.module';
import { Subscription, tap } from 'rxjs';
import { CheckTruthyPipe } from 'src/shared/pipes/check-truthy.pipe';
import { QuestionModel, FormErrorMessageModel } from 'src/app/features/form/models/form.model';
import { AnswerModel } from 'src/app/features/form/models/submission.model';
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
  @Output() valueChanged = new EventEmitter<AnswerModel>();

  form!: FormGroup;
  subscription!: Subscription;
  formErrorMessages = new FormErrorMessageModel();
  maxLimit: number = 0;
  extension: string = '';
  fileName: string = '';


  constructor(private fb: FormBuilder, private checkTruthyPipe: CheckTruthyPipe) { }

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
          this.maxLimit = +validation.value;
          break;
        case ValidationTypeEnum.extension:
          this.extension = validation.value;
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
    this.form.get('answer')?.setValue(reader.result as string);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
