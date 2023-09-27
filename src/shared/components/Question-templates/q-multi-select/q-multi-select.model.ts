import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ValidationTypeEnum } from "src/app/features/form/models/form.enum";
import { ValidationModel } from "src/app/features/form/models/form.model";

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

export function validateSelectionLimitFactory(limit: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedItems = control?.value!;
        if (selectedItems && selectedItems.length > limit) {
          return { maxSelectionExceeded: true } as ValidationErrors;
        }
        return null;
      }
} 
