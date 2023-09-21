import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFormState } from "./form.state.model";

const getFormsFeatureState = createFeatureSelector<IFormState>('form');

export const getAllForms = createSelector(getFormsFeatureState, state => state.allForms);