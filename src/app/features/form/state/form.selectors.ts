import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFormState } from "./form.state.model";

const getFormsFeatureState = createFeatureSelector<IFormState>('form');

export const getAllForms = createSelector(getFormsFeatureState, state => state.allForms);
export const getCurrentForm = createSelector(getFormsFeatureState, state => state.currentForm);
export const getCurrentStep = createSelector(getFormsFeatureState, state => state.currentQuestionIndex);