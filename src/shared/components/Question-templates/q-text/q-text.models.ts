import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QTextValidationModel {
    isRequired: string | null = null;
    max: number | null = null;
    min: number | null = null;
    regex: string | null = null;

    constructor(init: Partial<QTextValidationModel>) {
        Object.assign(this, init);
    }
}

// ? convert formbased validation model to dto
export const getTextValidationDto = (validations: QTextValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations?.isRequired)),
        new ValidationModel(ValidationTypeEnum.max, validations?.max?.toString()!),
        new ValidationModel(ValidationTypeEnum.min, validations?.min?.toString()!),
        new ValidationModel(ValidationTypeEnum.regex, validations?.regex!)
    ].filter(v => v.value);
}
