import { ValidationModel, ValidationTypeEnum } from "src/shared/models/question.model";

export class QFileValidationModel {
    isRequired: string | null = null; 
    maxSize: number | null = null;
    extension: string | null = null;

    constructor(init: Partial<QFileValidationModel>) {
        Object.assign(this, init);
    }
    
}

// ? convert formbased validation model to dto
export const getFileValidationDto = (validations: QFileValidationModel) => {
    return [
        new ValidationModel(ValidationTypeEnum.isRequired, validations.isRequired?.toString()!),
        new ValidationModel(ValidationTypeEnum.max, validations.maxSize?.toString()!),
        new ValidationModel(ValidationTypeEnum.extension, validations.extension?.toString()!)
    ].filter(v => v.value);
}