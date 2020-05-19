import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cofres'
})
export class CofresPipe implements PipeTransform {

  transform(cofre: string): any {
    cofre = cofre.toLowerCase();
    cofre = cofre.replace(/ /g, '-');
    console.log('../../../assets/chests/' + cofre + '.png');
    return '../../../assets/chests/' + cofre + '.png';
  }

}
