import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QTimeValidationModel {
    isRequired: string | null = null; 
    maxH: number | null = null;
    maxM: number | null = null;
    minH: number | null = null;
    minM: number | null = null;

    constructor(init: Partial<QTimeValidationModel>) {
        Object.assign(this, init);
    }
}

// ? convert formbased validation model to dto
export const getTimeValidationDto = (validations: QTimeValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, String(validations.isRequired)),
        new ValidationModel(ValidationTypeEnum.maxH, String(validations.maxH)),
        new ValidationModel(ValidationTypeEnum.maxM, String(validations.maxM)),
        new ValidationModel(ValidationTypeEnum.minH, String(validations.minH)),
        new ValidationModel(ValidationTypeEnum.minM, String(validations.minM)),
    ].filter(v => v.value);
}