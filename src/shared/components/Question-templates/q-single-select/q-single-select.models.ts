import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QSingleSelectValidationModel {
    isRequired: string | null = null;

    constructor(init: Partial<QSingleSelectValidationModel>) {
        Object.assign(this, init);
    }
}

// ? convert formbased validation model to dto
export const getSingleSelectValidationDto = (validations: QSingleSelectValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations.isRequired))
    ].filter(v => v.value);
}