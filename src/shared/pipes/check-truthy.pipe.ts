import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkTruthy'
})
export class CheckTruthyPipe implements PipeTransform {

  transform(value: string | null | undefined): boolean {
    if (value == 'false' || value == 'null' || value == null || value == undefined) {
      return false;
    }
    else return true
  }

}
