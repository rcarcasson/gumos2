import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modlevel'
})
export class ModlevelPipe implements PipeTransform {

  transform(level: number, maxlevel: number): string {
    if (level === maxlevel ) {
      return '13';
    }

    const levelActual = maxlevel - level;
    return String(13 - levelActual).toString();
  }

}
