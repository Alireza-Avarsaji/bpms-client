import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FormActions from './form.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { FormService } from "../service/form.service";
import { SubmissionService } from "../service/submission.service";
import { PageFilterModel } from "src/shared/models/filter-models/pageFilter.model";
import { AnswerModel, SubmissionModel } from "../models/submission.model";
import { Store } from "@ngrx/store";
import { State } from "./form.state.model";
import { getCurrentSubmission } from "./form.selectors";


@Injectable()
export class FormEffects {

    constructor(private actions$: Actions, private formService: FormService, private store: Store<State>, private submissionService: SubmissionService) { }

    getAllForms$ = createEffect(
        () => {
            const pageFilter = new PageFilterModel();
            return this.actions$.pipe(
                ofType(FormActions.loadAllForms),
                switchMap(() =>
                    this.formService.getformsByFilter(pageFilter, '').pipe(
                        map(res => {
                            return FormActions.loadAllFormsSuccess(res);
                        }),
                        catchError(err => of(FormActions.loadAllFormsError({ errorMessage: 'خطا در دریافت اطلاعات' })))
                    )
                )
            )
        }
    );


    getFormById$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(FormActions.loadFormById),
                switchMap(action => this.formService.getFormById(action.id).pipe(
                    map(res => {
                        return FormActions.loadFormByIdSuccess({ form: res.result })
                    }),
                    catchError(err => of(FormActions.loadFormByIdError({ errorMessage: 'خطا در دریافت اطلاعات' })))
                ))
            );
        }
    );

    postSubmission$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(FormActions.postSubmission),
                withLatestFrom(this.store.select(getCurrentSubmission)),
                switchMap(([action, submission]) => {
                    const answers = [...submission.answers];
                    const lastAnswer: AnswerModel = action.answer;
                    answers.push(lastAnswer);
                    const sub: SubmissionModel = {
                        formId: submission.formId,
                        answers: answers
                    };
                    return this.submissionService.createSubmission(sub);
                }),
                map(res => {
                    if (!res.hasError)
                        return FormActions.postSubmissionSuccess();
                    else
                        return FormActions.postSubmissionError();
                }),
                catchError(err => of(FormActions.postSubmissionError()))
            )
        }
    )
}