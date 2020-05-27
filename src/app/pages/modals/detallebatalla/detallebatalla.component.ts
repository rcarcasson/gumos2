import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detallebatalla',
  templateUrl: './detallebatalla.component.html',
  styleUrls: ['./detallebatalla.component.scss'],
})
export class DetallebatallaComponent implements OnInit {
  @Input() battleInfo;

  constructor() { }

  ngOnInit() {
    console.log(this.battleInfo);
  }

  cerrar() {
    
  }

}
