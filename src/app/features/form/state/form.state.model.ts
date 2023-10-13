import * as AppState from '../../../core/state/app.state';
import { FormBasedQuestion, FormModel } from '../models/form.model';
import { AnswerModel, SubmissionModel } from '../models/submission.model';

// ? main question store slice model
export interface IFormState {
    title: string;
    allForms: FormModel[];
    currentForm: FormModel;
    currentAnswers: AnswerModel[];
    currentQuestionIndex: number;
    postSubmissionSuccess: boolean;
    postSubmissionError: boolean;
}

// ? redefine the main state interface for handling lazy loading
export interface State extends AppState.State {
    formState: IFormState;
}


