import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QDateValidationModel {
    isRequired: string | null = null;
    max: string | null = null;
    min: string | null = null;

    constructor(init: QDateValidationModel) {
        Object.assign(this, init);
    }

}

export const getDateValidationDto = (validations: QDateValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations.isRequired)),
        new ValidationModel(ValidationTypeEnum.max, validations.max?.toString()!),
        new ValidationModel(ValidationTypeEnum.min, validations.min?.toString()!)
    ].filter(v => v.value);
}