import { createReducer, on } from "@ngrx/store";
import { IFormState } from "./form.state.model";
import * as FormActions from './form.actions'
import { FormModel } from "../models/form.model";


const initialState: IFormState = {
    title: '',
    allForms: [],
    currentForm: new FormModel(),
    currentAnswers: [],
    currentQuestionIndex: 0,
    postSubmissionSuccess: false,
    postSubmissionError: false
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

    // ? updates an answer
    on(
        FormActions.nextStep,
        (state, action) => {
            const answers = [...state.currentAnswers];
            const actionAnswer = answers.find(a => a.questionId == action.answer.questionId);
            if (actionAnswer) {
                const index = answers.indexOf(actionAnswer);
                answers[index] = action.answer;
            }
            else {
                answers.push(action.answer);
            }
            return {
                ...state,
                currentAnswers: answers,
                currentQuestionIndex: state.currentQuestionIndex + 1
            }
        }
    ),


    on(
        FormActions.previousStep,
        (state) => {
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex - 1
            }
        }
    ),

    on(
        FormActions.clearCurrentForm,
        (state) => {
            return {
                ...state,
                currentQuestionIndex: initialState.currentQuestionIndex,
                currentForm: initialState.currentForm,
                currentAnswers: initialState.currentAnswers,
                postSubmissionSuccess: initialState.postSubmissionSuccess,
                postSubmissionError: initialState.postSubmissionError,
            }
        }
    ),

    on(
        FormActions.postSubmissionSuccess,
        (state) => {
            return {
                ...state,
                postSubmissionSuccess: true

            }
        }
    ),

    on(
        FormActions.postSubmissionError,
        (state) => {
            return {
                ...state,
                postSubmissionError: true

            }
        }
    ),

)


