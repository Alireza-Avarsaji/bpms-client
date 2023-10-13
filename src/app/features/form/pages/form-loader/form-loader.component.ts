import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../state/form.state.model';
import { getCurrentForm, getCurrentStep, getPostSubmissionError, getPostSubmissionSuccess } from '../../state/form.selectors';
import { FormModel, QuestionModel } from '../../models/form.model';
import { Observable, tap } from 'rxjs';
import * as FormActions from '../../state/form.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionTypesEnum } from '../../models/form.enum';
import { AnswerModel, UpdateStepperActionModel } from '../../models/submission.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'jalali-moment';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.scss']
})
export class FormLoaderComponent implements OnInit, OnDestroy {

  form$!: Observable<FormModel>;
  currentStep$!: Observable<number>;
  questionTypeEnum = QuestionTypesEnum;

  constructor(private store: Store<State>,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.store.dispatch(FormActions.loadFormById({ id: param['id'] }))
    );
    this.form$ = this.store.select(getCurrentForm);
    this.currentStep$ = this.store.select(getCurrentStep);
    this.handlePostSubmissionSuccess().subscribe();
    this.handlePostSubmissionError().subscribe();
  }

  trackById(index: number, item: QuestionModel) {
    return item.id;
  }


  onStepChanged(data: UpdateStepperActionModel) {

    if (data.movement == 'next')
      this.store.dispatch(FormActions.nextStep({ answer: data.answer! }))
    else if (data.movement == 'previous')
      this.store.dispatch(FormActions.previousStep())
    else{
      console.log(data);
      
      this.store.dispatch(FormActions.postSubmission({ answer: data.answer! }))
    }
  }

  handlePostSubmissionSuccess() {

    return this.store.select(getPostSubmissionSuccess).pipe(
      tap(success => {
        if (success) {
          this._snackBar.open(
            'با موفقیت ثبت شد', undefined, {
            duration: 3500
          }
          );
          this.router.navigate(['/home']);
        }
      })
    )

  }

  handlePostSubmissionError() {
    return this.store.select(getPostSubmissionError).pipe(
      tap(error => {
        if (error) {
          this._snackBar.open(
            'عملیات با خطا مواجه شد', undefined, {
            duration: 2500
          }
          );
          this.router.navigate(['/home']);
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.store.dispatch(FormActions.clearCurrentForm());
  }




}
