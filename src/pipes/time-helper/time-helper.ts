import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

/**
 * Generated class for the TimeHelperPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timeHelper',
})
export class TimeHelperPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}

@Pipe({
  name: 'toLower',
})
export class LowerCase implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
