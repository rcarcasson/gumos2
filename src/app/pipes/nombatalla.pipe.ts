import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombatalla'
})
export class NombatallaPipe implements PipeTransform {

  transform(value: string): string {
    let batalla: string;
    switch (value) {
      case 'PvP':
        batalla = 'Batalla 1v1';
        break;
      case 'clanWarCollectionDay':
        batalla = 'Batalla de Día de Colección';
        break;
      case 'casual2v2':
        batalla = 'Batalla 2v2';
        break;
      default:
        batalla = 'Batalla';
        break;
    }
    return batalla;
  }

}
