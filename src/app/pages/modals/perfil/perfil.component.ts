import { Component, OnInit, ViewChild, Input } from '@angular/core';
import _ from 'lodash';
import { PlayerInfo } from 'src/app/models/player.model';
import { Chart } from 'chart.js';
import { ChestInfo } from 'src/app/models/inc-chest.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() infoPlayer: PlayerInfo;
  @Input() chestInfo: ChestInfo;
  @ViewChild('battlesChart', {static: true}) battlesChart;

  public titulo = 'Mi Perfil';
  public corazon = 'heart-outline';

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    zoom: {
      toggle: false
    }
  };

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.titulo = _.get(this.infoPlayer, 'name');
  }

  ionViewDidEnter() {
    this.graficoBatallas();
  }

  graficoBatallas() {
    const myPieChart = new Chart(this.battlesChart.nativeElement, {
      type: 'pie',
      data: {
        // tslint:disable-next-line: max-line-length
        labels: ['Victorias: ' + this.infoPlayer.wins, 'Derrotas: ' + this.infoPlayer.losses, 'Vic. 3 coronas: ' + this.infoPlayer.threeCrownWins],
        datasets: [{
          label: 'Batallas',
          data: [
            this.infoPlayer.wins, this.infoPlayer.losses, this.infoPlayer.threeCrownWins
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)'
          ]
        }]
      }
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  favorite() {
    let favoritos: Array<string>;
    favoritos = JSON.parse(localStorage.getItem('favoritos'));
    if (_.indexOf(favoritos, _.get(this.infoPlayer, 'name')) !== -1 || favoritos === []) {
      favoritos.push(_.get(this.infoPlayer, 'name'));
      this.corazon = 'heart';
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

  }

}
