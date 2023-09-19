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






);


