
import { getDateValidationDto } from "src/shared/components/Question-templates/q-date/q-date.model";
import { getFileValidationDto } from "src/shared/components/Question-templates/q-file/q-file.model";
import { getMultiSelectValidationDto } from "src/shared/components/Question-templates/q-multi-select/q-multi-select.model";
import { getRadioValidationDto } from "src/shared/components/Question-templates/q-radio/q-radio.model";
import { getRangeValidationDto } from "src/shared/components/Question-templates/q-range/q-range.model";
import { getSingleSelectValidationDto } from "src/shared/components/Question-templates/q-single-select/q-single-select.models";
import { getTextValidationDto } from "src/shared/components/Question-templates/q-text/q-text.models";
import { getTimeValidationDto } from "src/shared/components/Question-templates/q-time/q-time.model";
import { QuestionTypesEnum } from "src/shared/models/question.model";

export const formValidationToDtoAdaptor = (type: QuestionTypesEnum, validations: any) => {
    switch (type) {
        case QuestionTypesEnum.text:
           return getTextValidationDto(validations);
        case QuestionTypesEnum.single_select:
           return getSingleSelectValidationDto(validations);
        case QuestionTypesEnum.multi_select:
           return getMultiSelectValidationDto(validations);
        case QuestionTypesEnum.time:
           return getTimeValidationDto(validations);
        case QuestionTypesEnum.range:
           return getRangeValidationDto(validations);
        case QuestionTypesEnum.radio:
           return getRadioValidationDto(validations);
        case QuestionTypesEnum.file:
           return getFileValidationDto(validations);
        case QuestionTypesEnum.date:
           return getDateValidationDto(validations);
    }
}