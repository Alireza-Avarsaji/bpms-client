import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBasedQuestion, State } from '../create-form/state/form.state.model';
import { QuestionTypesEnum, SubQuestionModel, ValidationTypeEnum } from 'src/shared/models/question.model';
import { QTextValidationModel } from 'src/shared/components/Question-templates/q-text/q-text.models';
import * as FormActions from '../create-form/state/form.actions';
import { QSingleSelectValidationModel } from 'src/shared/components/Question-templates/q-single-select/q-single-select.models';
import { QMultiSelectValidationModel } from 'src/shared/components/Question-templates/q-multi-select/q-multi-select.model';
import { QTimeValidationModel } from 'src/shared/components/Question-templates/q-time/q-time.model';
import { QRangeValidationModel } from 'src/shared/components/Question-templates/q-range/q-range.model';
import { QRadioValidationModel } from 'src/shared/components/Question-templates/q-radio/q-radio.model';
import { QFileValidationModel } from 'src/shared/components/Question-templates/q-file/q-file.model';
import { QDateValidationModel } from 'src/shared/components/Question-templates/q-date/q-date.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionAdaptorService {

  constructor(private store: Store<State>) { }

  DtoToformBasedQuestionAdaptor = (sub: SubQuestionModel) => {
    switch (sub.type) {
      case QuestionTypesEnum.text:
        return this.getTextFormBasedValidation(sub);
      case QuestionTypesEnum.single_select:
        return this.getSingleSelectFormBasedValidation(sub);
      case QuestionTypesEnum.multi_select:
        return this.getMultiSelectFormBasedValidation(sub);
      case QuestionTypesEnum.time:
        return this.getTimeFormBasedValidation(sub);
      case QuestionTypesEnum.range:
        return this.getRangeFormBasedValidation(sub);
      case QuestionTypesEnum.radio:
        return this.getRadioFormBasedValidation(sub);
      case QuestionTypesEnum.file:
        return this.getFileFormBasedValidation(sub);
      case QuestionTypesEnum.date:
        return this.getDateFormBasedValidation(sub);
    }
  }

  // ? convert dto to formbased validation model
  getTextFormBasedValidation = (q: SubQuestionModel) => {

    
    
    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const max = +q.validations.find(v => v.type == ValidationTypeEnum.max)?.value!;
    const min = +q.validations.find(v => v.type == ValidationTypeEnum.min)?.value!;
    const regex = q.validations.find(v => v.type == ValidationTypeEnum.regex)?.value!;
    const validations = {
      isRequired,
      max,
      min,
      regex
    };
    const question: FormBasedQuestion<QTextValidationModel> = new FormBasedQuestion<QTextValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getSingleSelectFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const validations = {
      isRequired
    };
    const question: FormBasedQuestion<QSingleSelectValidationModel> = new FormBasedQuestion<QSingleSelectValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getMultiSelectFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const max = +q.validations.find(v => v.type == ValidationTypeEnum.max)?.value!;
    const validations = {
      isRequired,
      max,
    };
    const question: FormBasedQuestion<QMultiSelectValidationModel> = new FormBasedQuestion<QMultiSelectValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getTimeFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const maxH = +q.validations.find(v => v.type == ValidationTypeEnum.maxH)?.value!;
    const maxM = +q.validations.find(v => v.type == ValidationTypeEnum.maxM)?.value!;
    const minH = +q.validations.find(v => v.type == ValidationTypeEnum.minH)?.value!;
    const minM = +q.validations.find(v => v.type == ValidationTypeEnum.minM)?.value!;
    const validations = {
      isRequired,
      maxH,
      maxM,
      minH,
      minM
    };
    const question: FormBasedQuestion<QTimeValidationModel> = new FormBasedQuestion<QTimeValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getRangeFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const max = +q.validations.find(v => v.type == ValidationTypeEnum.max)?.value!;
    const min = +q.validations.find(v => v.type == ValidationTypeEnum.min)?.value!;
    const validations = {
      isRequired,
      max,
      min
    };
    const question: FormBasedQuestion<QRangeValidationModel> = new FormBasedQuestion<QRangeValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getRadioFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const validations = {
      isRequired
    };
    const question: FormBasedQuestion<QRadioValidationModel> = new FormBasedQuestion<QRadioValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

  // ? convert dto to formbased validation model
  getFileFormBasedValidation = (q: SubQuestionModel) => {

    const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
    const maxSize = +q.validations.find(v => v.type == ValidationTypeEnum.max)?.value!;
    const extension = q.validations.find(v => v.type == ValidationTypeEnum.extension)?.value!;
    const validations = {
      isRequired,
      maxSize,
      extension
    };
    const question: FormBasedQuestion<QFileValidationModel> = new FormBasedQuestion<QFileValidationModel>(q.id, q.type, q.key, q.values, validations);
    this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
  }

    // ? convert dto to formbased validation model
    getDateFormBasedValidation = (q: SubQuestionModel) => {

      const isRequired = q.validations.find(v => v.type == ValidationTypeEnum.isRequired)?.value!;
      const max = q.validations.find(v => v.type == ValidationTypeEnum.max)?.value!;
      const min = q.validations.find(v => v.type == ValidationTypeEnum.min)?.value!;
      const validations = {
        isRequired,
        max,
        min
      };
      const question: FormBasedQuestion<QDateValidationModel> = new FormBasedQuestion<QDateValidationModel>(q.id, q.type, q.key, q.values, validations);
      this.store.dispatch(FormActions.AddQuestion({ formValue: question }));
    }


}
