import { createAction, props } from "@ngrx/store";
import { TSResult } from "src/shared/models/result-model/TServiceResult";
import { PageList } from "src/shared/models/result-model/pageList.model";
import { FormModel } from "../models/form.model";
import { AnswerModel, SubmissionModel } from "../models/submission.model";

export const loadAllForms = createAction(
    '[Form] loadAllForms'
);

export const loadAllFormsSuccess = createAction(
    '[Form] loadAllFormsSuccess',
    props<TSResult<PageList<FormModel>>>()
);

export const loadAllFormsError = createAction(
    '[Form] loadAllFormsError',
    props<{ errorMessage: string }>()
);

export const NavigateToForm = createAction(
    '[Form] NavigateToForm',
    props<{ title: string }>()
);

export const loadFormById = createAction(
    '[form] loadFormById',
    props<{id: string}>()
);

export const loadFormByIdSuccess = createAction(
    '[form] loadFormByIdSuccess',
    props<{form: FormModel}>()
);

export const loadFormByIdError = createAction(
    '[form] loadFormByIdError',
    props<{ errorMessage: string }>()
);

export const updateAnswer = createAction(
    '[form] updateAnswer',
    props<{answer: AnswerModel}>()
);