import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidationTypeEnum } from "src/app/features/form/models/form.enum";
import { ValidationModel } from "src/app/features/form/models/form.model";

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

export function validateTimeLimitFactory(maxH: number, minH: number, maxM: number, minM: number): ValidatorFn {

    const error = { max: `ساعت انتخابی باید بین ${minH + ':' + minM} و ${maxH + ':' + maxM} باشد` };
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const hour = formGroup.get('hour')?.value;
        const minute = formGroup.get('minute')?.value;
        if (hour === null || minute === null)
            return null;
        const errCondition1 = hour > maxH || hour < minH;
        const errCondition2 = hour == maxH && minute > maxM;
        const errCondition3 = hour == minH && minute < minM;

        if (errCondition1 || errCondition2 || errCondition3)
            return error;
        else
            return null;
    }
} 
