import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgbatalla'
})
export class ImgbatallaPipe implements PipeTransform {

  transform(value: string): string {
    let img: string;
    switch (value) {
      case 'PvP':
        img = 'battle-ladder.png';
        break;
      case 'clanWarCollectionDay':
        img = 'waricon.png';
        break;
      case 'casual2v2':
        img = 'battle-team.png';
        break;
      default:
        img = 'swords.png';
        break;
    }
    return img;
  }

}
