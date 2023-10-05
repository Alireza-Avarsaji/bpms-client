import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state/form.state.model';
import { getCurrentForm, getCurrentStep } from '../../state/form.selectors';
import { FormModel, QuestionModel } from '../../models/form.model';
import { Observable, tap } from 'rxjs';
import * as FormActions from '../../state/form.actions';
import { ActivatedRoute } from '@angular/router';
import { QuestionTypesEnum } from '../../models/form.enum';
import { AnswerModel, UpdateStepperActionModel } from '../../models/submission.model';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.scss']
})
export class FormLoaderComponent implements OnInit {

  form$!: Observable<FormModel>;
  currentStep$!: Observable<number>;
  questionTypeEnum = QuestionTypesEnum;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.store.dispatch(FormActions.loadFormById({ id: param['id'] }))
    );
    this.form$ = this.store.select(getCurrentForm);
    this.currentStep$ = this.store.select(getCurrentStep);
  }

  trackById(index: number, item: QuestionModel) {
    return item.id;
  }

  onAnswerChange(answer: AnswerModel) {
    this.store.dispatch(FormActions.updateAnswer({ answer }));
  }

  onStepChanged(data: UpdateStepperActionModel) {
    data.movement == 'next' ?
      this.store.dispatch(FormActions.nextStep({answer: data.answer!})) :
      this.store.dispatch(FormActions.previousStep())
  }



}
