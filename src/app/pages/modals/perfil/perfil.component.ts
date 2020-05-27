import { Component, OnInit, ViewChild, Input } from '@angular/core';
import _ from 'lodash';
import { PlayerInfo } from 'src/app/models/player.model';
import { Chart } from 'chart.js';
import { ChestInfo } from 'src/app/models/inc-chest.model';
import { ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/shared/alertas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() infoPlayer: PlayerInfo;
  @Input() chestInfo: ChestInfo;
  @Input() showHeart;
  @ViewChild('battlesChart', {static: true}) battlesChart;

  public titulo = 'Mi Perfil';
  public corazon = 'heart-outline';
  public existeClan = true;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    zoom: {
      toggle: false
    }
  };

  constructor(
    private modalController: ModalController,
    private alertaService: AlertasService
  ) { }

  ngOnInit() {
    this.titulo = _.get(this.infoPlayer, 'name');
    if (_.get(this.infoPlayer, 'clan', '') === '') {
      this.existeClan = false;
    }
    if (this.checkFavorite()) {
      this.corazon = 'heart';
    }
  }

  // ionViewDidEnter() {
  //   this.graficoBatallas();
  // }

  // graficoBatallas() {
  //   const myPieChart = new Chart(this.battlesChart.nativeElement, {
  //     type: 'pie',
  //     data: {
  //       // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: max-line-length
  //       labels: ['Victorias: ' + this.infoPlayer.wins, 'Derrotas: ' + this.infoPlayer.losses, 'Vic. 3 coronas: ' + this.infoPlayer.threeCrownWins],
  //       datasets: [{
  //         label: 'Batallas',
  //         data: [
  //           this.infoPlayer.wins, this.infoPlayer.losses, this.infoPlayer.threeCrownWins
  //         ],
  //         backgroundColor: [
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(255, 206, 86, 1)'
  //         ]
  //       }]
  //     }
  //   });
  // }

  cerrar() {
    this.modalController.dismiss();
  }

  favorite() {
    const player = _.get(this.infoPlayer, 'name');
    let favoritos = JSON.parse(localStorage.getItem('favPlayer'));
    if (favoritos === null) {
      favoritos = [];
    }
    if (this.playerIndex(player, favoritos) === -1 || favoritos.length === 0) {
      const data = {
        playerName: player,
        playerTag: _.get(this.infoPlayer, 'tag'),
        type: 'player'
      };
      favoritos.push(data);
      this.corazon = 'heart';
      localStorage.setItem('favPlayer', JSON.stringify(favoritos));
      this.alertaService.mostrarToast(player + ' agregado a tus favoritos');
    } else {
      const removidos = _.remove(favoritos, (p) => p.playerName === player );
      localStorage.setItem('favPlayer', JSON.stringify(favoritos));
      this.corazon = 'heart-outline';
      this.alertaService.mostrarToast(player + ' eliminado de tus favoritos');
    }

  }

  private checkFavorite() {
    let existe = true;
    let favoritos = [];
    const player = _.get(this.infoPlayer, 'name');
    favoritos = JSON.parse(localStorage.getItem('favPlayer'));
    if (this.playerIndex(player, favoritos) === -1 || favoritos.length === 0) {
      existe = false;
    }
    return existe;
  }

  private playerIndex(player: string, fav: any) {
    return _.findIndex(fav, { playerName : player});
  }

}
