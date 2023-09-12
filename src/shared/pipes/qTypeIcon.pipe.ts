import { Pipe, PipeTransform } from '@angular/core';
import { QuestionTypesEnum } from 'src/shared/models/question.model';


@Pipe({ name: 'qTypeIcon' })
export class QTypeIconPipe implements PipeTransform {
    transform(qType: QuestionTypesEnum): any {
        let result;
        switch (qType) {
            case QuestionTypesEnum.text:
                result = 'article'
                break;
            case QuestionTypesEnum.single_select:
                result = 'done'
                break;
            case QuestionTypesEnum.multi_select:
                result = 'checklist'
                break;
            case QuestionTypesEnum.range:
                result = 'linear_scale'
                break;
            case QuestionTypesEnum.date:
                result = 'calendar_month'
                break;
            case QuestionTypesEnum.time:
                result = 'schedule'
                break;
            case QuestionTypesEnum.file:
                result = 'upload_file'
                break;
            case QuestionTypesEnum.radio:
                result = 'toggle_on'
                break;
            default:
                result = '';
        }
        return result;
    }
}
