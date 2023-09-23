import { createReducer, on } from "@ngrx/store";
import { IFormState } from "./form.state.model";
import * as FormActions from './form.actions'
import { FormModel } from "../models/form.model";


const initialState: IFormState = {
    title: '',
    allForms: [],
    currentForm: new FormModel()
}

export const formReducer = createReducer(initialState,

    // ? fill allForms data
    on(
        FormActions.loadAllFormsSuccess,
        (state, action) => {
            return {
                ...state,
                allForms: action.result.items
            }
        }
    ),

    // ? handle allForms error
    on(
        FormActions.loadAllFormsError,
        (state) => {
            return {
                ...state,
                allForms: []
            }
        }
    ),

    // ? load current form 
    on(
        FormActions.loadFormByIdSuccess,
        (state, action) => {
            return {
                ...state,
                currentForm: action.form
            }
        }
    ),

    // ? handle loadForm error
    on(
        FormActions.loadFormByIdError,
        (state) => {
            return {
                ...state,
                allForms: []
            }
        }
    ),




)


