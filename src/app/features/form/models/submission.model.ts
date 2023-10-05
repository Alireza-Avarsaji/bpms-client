export class SubmissionModel {
    formId: string = '';
    answers!: AnswerModel[]; 
}

export class AnswerModel {
    qId!: string;
    value!: string;
}

export interface UpdateStepperActionModel {
    movement: 'next' | 'previous';
    answer?: AnswerModel;
}