import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FormActions from './form.actions';
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { getFormState } from "./form.selectors";
import { QuestionModel, SubQuestionModel } from "src/shared/models/question.model";
import { formValidationToDtoAdaptor } from "../adaptors/validations.adaptor";
import { FormService } from "../../service/form.service";
import { of } from "rxjs";
import { FormBasedQuestion, State } from "./form.state.model";
import { Store } from "@ngrx/store";
import { QuestionAdaptorService } from "../../service/question-adaptor.service";


@Injectable()
export class QuestionEffects {
    constructor(private actions$: Actions, private questionService: FormService, private store: Store<State>, private qAdaptor: QuestionAdaptorService) { }

    postQuestion$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(FormActions.postForm),
                withLatestFrom(this.store.select(getFormState)),
                switchMap(([action, state]) => {
                    const dto = new QuestionModel();
                    dto.title = state.title;
                    for (const sub of (state.formBasedQuestions as FormBasedQuestion<any>[])) {
                        const item = new SubQuestionModel(sub);
                        item.validations = formValidationToDtoAdaptor(sub.type, sub.validations);
                        dto.questions.push(item);
                    }
                    return this.questionService.postForm(dto).pipe(
                        map(res => FormActions.postFormSuccess(res)),
                        catchError(err => of(FormActions.postFormError(err)))
                    )
                })
            )
        }
    );

    getQuestion$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(FormActions.loadForm),
                switchMap(action => this.questionService.getFormById(action.id)),
                map(res => {
                    this.store.dispatch(FormActions.UpdateFormTitle({title: res.result.title}));
                    for (const sub of res.result.questions) {
                        this.qAdaptor.DtoToformBasedQuestionAdaptor(sub);
                    }

                    if (!res.hasError)
                        return FormActions.loadFormSuccess();
                    else
                        return FormActions.loadFormError();
                })
            )
        }
    );
}