import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cofres'
})
export class CofresPipe implements PipeTransform {

  transform(cofre: string): any {
    cofre = cofre.toLowerCase().replace(/ /g, '-');
    return '../../../assets/chests/' + cofre + '.png';
  }

}
