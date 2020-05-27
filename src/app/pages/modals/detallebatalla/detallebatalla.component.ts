import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detallebatalla',
  templateUrl: './detallebatalla.component.html',
  styleUrls: ['./detallebatalla.component.scss'],
})
export class DetallebatallaComponent implements OnInit {
  @Input() battleInfo;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.battleInfo);
  }

  cerrar() {
    this.modalController.dismiss();
  }

}
