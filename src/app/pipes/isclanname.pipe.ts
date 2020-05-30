import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'isclanname'
})
export class IsclannamePipe implements PipeTransform {

  transform(value: any): string {
    const name = _.get(value, 'name', '');
    if (name !== '') {
      return name;
    } else {
      return 'Sin Clan';
    }
  }

}
