import { INameValue, QuestionTypesEnum } from "../models/question.model";

export const QuestionTypeList: INameValue[] = [
    {
        name: 'متنی',
        value: QuestionTypesEnum.text
    },
    {
        name: 'تک انتخابی',
        value: QuestionTypesEnum.single_select
    },
    {
        name: 'چند انتخابی',
        value: QuestionTypesEnum.multi_select
    },
    {
        name: 'بازه ای',
        value: QuestionTypesEnum.range
    },
    {
        name: 'تاریخ',
        value: QuestionTypesEnum.date
    },
    {
        name: 'زمان',
        value: QuestionTypesEnum.time
    },
    {
        name: 'فایل',
        value: QuestionTypesEnum.file
    },
    {
        name: 'دوحالته',
        value: QuestionTypesEnum.radio
    },
] 