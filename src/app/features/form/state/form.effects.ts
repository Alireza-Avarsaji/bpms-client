import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FormActions from './form.actions';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { FormService } from "../service/form.service";
import { PageFilterModel } from "src/shared/models/filter-models/pageFilter.model";


@Injectable()
export class FormEffects {

    constructor(private actions$: Actions, private formService: FormService) { }

    getAllForms$ = createEffect(
        () => {
            const pageFilter = new PageFilterModel();
            return this.actions$.pipe(
                ofType(FormActions.loadForms),
                switchMap(() =>
                    this.formService.getformsByFilter(pageFilter, '').pipe(
                        map(res => {
                            return FormActions.loadFormsSuccess(res);
                        }),
                        catchError(err => of(FormActions.loadFormsError({ errorMessage: 'خطا در دریافت اطلاعات' })))
                    )
                )
            )
        }
    );
}