import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winlose'
})
export class WinlosePipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return 'danger';
    } else {
      return 'success';
    }
  }

}
