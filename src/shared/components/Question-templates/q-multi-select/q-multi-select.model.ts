import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QMultiSelectValidationModel {
    isRequired: string | null = null;
    max: number | null = null;

    constructor(init: Partial<QMultiSelectValidationModel>) {
        Object.assign(this, init);
    }
}

// ? convert formbased validation model to dto
export const getMultiSelectValidationDto = (validations: QMultiSelectValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations.isRequired)),
        new ValidationModel(ValidationTypeEnum.max, validations.max?.toString()!)
    ].filter(v => v.value);
}