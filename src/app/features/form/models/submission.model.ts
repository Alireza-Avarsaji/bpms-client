export class SubmissionModel {
    formId: string = '';
    answers!: AnswerModel[]; 
}

export class AnswerModel {
    questionId!: string;
    answerValue!: string;
}

export interface UpdateStepperActionModel {
    movement: 'next' | 'previous' | 'submit';
    answer?: AnswerModel;
}