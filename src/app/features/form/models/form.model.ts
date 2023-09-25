import { QuestionTypesEnum, ValidationTypeEnum } from "./form.enum";

export class FormModel {
    id: string = '';
    title: string = '';
    hint: string = '';
    createdAt: string = '';
    questions: QuestionModel[] = [];
}

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

export class QuestionModel {
    id!: string;
    key!: string;
    type!: QuestionTypesEnum;
    values?: string[];
    validations!:  ValidationModel[];
    hint: string = '';

    constructor(init?: FormBasedQuestion<any>) {
        this.values = [];
        this.key = init!.key;
        this.type = init!.type;
        this.values = init!.values;
    }
}

export interface INameValue {
    name: string;
    value: any;
}

export class ValidationModel {
    type!: ValidationTypeEnum;
    value!: string;

    constructor(type: ValidationTypeEnum, value: string) {
        this.type = type;
        this.value = value;
    }
}

export class FormErrorMessageModel {
    max: string = '';
    min: string = '';
    isRequired: string = '';
    multi_select_length: string = '';
    file_size: string = '';
    regex: string = '';
    extension: string = '';
    maxH: string = '';
    minH: string = '';
    maxM: string = '';
    minM: string = '';
}


