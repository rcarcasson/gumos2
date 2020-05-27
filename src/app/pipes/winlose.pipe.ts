import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winlose'
})
export class WinlosePipe implements PipeTransform {

  transform(jugador: number, oponente: number): string {
    if (jugador < oponente) {
      return 'danger';
    } else {
      return 'success';
    }
  }

}
