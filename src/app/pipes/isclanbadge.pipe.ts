import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'isclanbadge'
})
export class IsclanbadgePipe implements PipeTransform {

  transform(value: any): string {
    const badgeId = _.get(value, 'badgeId', '');
    if (badgeId !== '') {
      return '../../../assets/badges/' + badgeId + '.png';
    } else {
      return '../../../assets/badges/0.png';
    }
  }

}
