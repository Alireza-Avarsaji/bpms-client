import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFormState } from "./form.state.model";

const getFormsFeatureState = createFeatureSelector<IFormState>('form');

export const getAllForms = createSelector(getFormsFeatureState, state => state.allForms);
export const getCurrentForm = createSelector(getFormsFeatureState, state => state.currentForm);
export const getCurrentStep = createSelector(getFormsFeatureState, state => state.currentQuestionIndex);
export const getCurrentSubmission = createSelector(getFormsFeatureState, state => {
    return {
        answers: state.currentAnswers,
        formId: state.currentForm.id
    }
});
export const getPostSubmissionSuccess = createSelector(getFormsFeatureState, state => state.postSubmissionSuccess);
export const getPostSubmissionError = createSelector(getFormsFeatureState, state => state.postSubmissionError);
