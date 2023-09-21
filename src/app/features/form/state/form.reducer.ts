import { createReducer, on } from "@ngrx/store";
import { IFormState } from "./form.state.model";
import * as FormActions from './form.actions'


const initialState: IFormState = {
    title: '',
    allForms: [],
    currentForm: {
        title: '',
        formBasedQuestions: []
    }
}

export const formReducer = createReducer(initialState,

    // ? fill allForms data
    on(
        FormActions.loadFormsSuccess,
        (state, action) => {
            return {
                ...state,
                allForms: action.result.items
            }
        }
    ),

    // ? handle allForms error
    on(
        FormActions.loadFormsError,
        (state) => {
            return {
                ...state,
                allForms: []
            }
        }
    ),




)


