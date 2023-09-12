import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QRadioValidationModel {
    isRequired: string | null = null; 
    constructor(init: Partial<QRadioValidationModel>) {
        Object.assign(this, init);
    }
}

// ? convert formbased validation model to dto
export const getRadioValidationDto = (validations: QRadioValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations.isRequired))
    ].filter(v => v.value);
}