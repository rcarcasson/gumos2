import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goldencard'
})
export class GoldencardPipe implements PipeTransform {

  transform(card: string, starLevel: number = 0): any {
    const carta = card.toLocaleLowerCase().replace(' ', '-');
    if (starLevel === 0) {
      return '../../../assets/cards-150/' + carta + '.png';
    } else {
      return '../../../assets/cards-150-gold/' + carta + '.png';
    }
  }

}
