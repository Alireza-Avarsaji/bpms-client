import * as AppState from '../../../../state/app.state';
import { QuestionTypesEnum } from "src/shared/models/question.model";

export class FormBasedQuestion<T> {
    id: string = '';
    type!: QuestionTypesEnum;
    key: string = '';
    values?: string[];
    validations?: T;
    isValid: boolean = false;

    constructor(id?: string, type?: QuestionTypesEnum, key?: string, values?: string[], validations?: T) {
        this.id = id!;
        this.type = type!;
        this.key = key!;
        this.values = values!;
        this.validations = validations!;
    }
}

// ? main question store slice model
export interface IFormState {
    title: string;
    formBasedQuestions: FormBasedQuestion<any>[];
}

// ? redefine the main state interface for handling lazy loading
export interface State extends AppState.State {
    forms: IFormState;
}


