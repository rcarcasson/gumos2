import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import _ from 'lodash';
import { Convert, PlayerInfo } from 'src/app/models/player.model';
import { CONST } from 'src/app/constants/general.const';
import { Chart } from 'chart.js';
import { AlertasService } from 'src/app/shared/alertas.service';
import { Observable } from 'rxjs';
import { ClashProvider } from 'src/app/providers/clashservice.provider';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  @ViewChild('battlesChart', {static: true}) battlesChart;

  public infoPlayer: PlayerInfo;
  public titulo = 'Mi Perfil';
  private tagPlayer = '';
  constructor(
    private storageService: StorageService,
    private alertaService: AlertasService,
    private clashProvider: ClashProvider
  ) { }

  ngOnInit() {

    this.infoPlayer = Convert.toPlayerInfo(this.storageService.getDataPlayer(_.get(CONST, 'GENERAL.PLAYER_KEY')));
    console.log(this.infoPlayer);
    if (this.infoPlayer) {
      this.titulo = this.infoPlayer.name;
      this.tagPlayer = _.replace(this.infoPlayer.tag, '#', '');
    }
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

  actualizar() {
    this.alertaService.showLoading('Actualizando información...');

    const cbOk = response => {
      this.infoPlayer = response;
      const playerInfo = Convert.toPlayerInfo(JSON.stringify(this.infoPlayer));
      this.storageService.setData(_.get(CONST, 'GENERAL.PLAYER_KEY'), playerInfo);
      this.alertaService.hideLoading();
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      const data = {
        title: 'Atención',
        message: 'Ocurrio un error en la ejecución de uno de los servicios.'
      };
      this.alertaService.mostrarAlerta(data);
    };

    this.clashProvider.getInfoJugador(this.tagPlayer).subscribe(cbOk, cbError);
  }

}