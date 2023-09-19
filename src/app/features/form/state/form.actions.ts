import { createAction, props } from "@ngrx/store";

export const loadForms = createAction(
    '[Form] loadForms'
);

export const loadFormsSuccess = createAction(
    '[Form] loadFormsSuccess'
);

export const loadFormsError = createAction(
    '[Form] loadFormsError'
);

export const NavigateToForm = createAction(
    '[Form] NavigateToForm',
    props<{ title: string }>()
);