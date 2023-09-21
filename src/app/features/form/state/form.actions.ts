import { createAction, props } from "@ngrx/store";
import { TSResult } from "src/shared/models/result-model/TServiceResult";
import { PageList } from "src/shared/models/result-model/pageList.model";
import { FormModel } from "../models/form.model";

export const loadForms = createAction(
    '[Form] loadForms'
);

export const loadFormsSuccess = createAction(
    '[Form] loadFormsSuccess',
    props<TSResult<PageList<FormModel>>>()
);

export const loadFormsError = createAction(
    '[Form] loadFormsError',
    props<{ errorMessage: string }>()
);

export const NavigateToForm = createAction(
    '[Form] NavigateToForm',
    props<{ title: string }>()
);