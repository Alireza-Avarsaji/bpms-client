import * as AppState from '../../../core/state/app.state';
import { FormBasedQuestion, FormModel } from '../models/form.model';
import { SubmissionModel } from '../models/submission.model';

// ? main question store slice model
export interface IFormState {
    title: string;
    allForms: FormModel[];
    currentForm: FormModel;
    currentSubmission: SubmissionModel
}

// ? redefine the main state interface for handling lazy loading
export interface State extends AppState.State {
    formState: IFormState;
}


