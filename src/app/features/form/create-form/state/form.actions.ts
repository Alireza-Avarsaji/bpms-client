import { createAction, props } from "@ngrx/store";
import { FormBasedQuestion } from "./form.state.model";

export const AddQuestion = createAction(
    '[Form] AddQuestion',
    props<{ formValue: FormBasedQuestion<any> }>()
);

export const RemoveQuestion = createAction(
    '[Form] RemoveQuestion',
    props<{ id: string }>()
);

export const UpdateQuestion = createAction(
    '[Form] UpdateQuestion',
    props<{ formValue: FormBasedQuestion<any> }>()
);

export const UpdateFormTitle = createAction(
    '[Form] UpdateQuestionTitle',
    props<{ title: string }>()
);

export const postForm = createAction(
    '[Form] postForm'
);

export const postFormSuccess = createAction(
    '[Form] postFormSuccess',
    props<any>()
);

export const postFormError = createAction(
    '[Form] postFormError',
    props<any>()
);

export const loadForm = createAction(
    '[Form] loadForm',
    props<{id: string}>()
);

export const loadFormSuccess = createAction(
    '[Form] loadFormSuccess'
);

export const loadFormError = createAction(
    '[Form] loadFormError'
);