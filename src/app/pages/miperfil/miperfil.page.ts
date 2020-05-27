import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import _ from 'lodash';
import { Convert, PlayerInfo } from 'src/app/models/player.model';
import { CONST } from 'src/app/constants/general.const';
import { Chart } from 'chart.js';
import { AlertasService } from 'src/app/shared/alertas.service';
import { ClashProvider } from 'src/app/providers/clashservice.provider';
import { ConvertChest, ChestInfo } from 'src/app/models/inc-chest.model';
import { NavController, IonContent } from '@ionic/angular';
import { BattleLog, ConvertBattle } from 'src/app/models/battlelog.model';
import { ModalProvider } from '../modals/modal.provider';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {
  // @ViewChild('battlesChart', {static: false}) battlesChart;
  @ViewChild(IonContent, {static: false}) contentArea: IonContent;

  public infoPlayer: PlayerInfo;
  public chestInfo: ChestInfo;
  public battleInfo: BattleLog[];
  public titulo = 'Mi Perfil';
  private tagPlayer = '';
  public perfilSegment = 'playerInfo';
  public existeClan = true;
  public cargado = false;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    zoom: {
      toggle: false
    }
  };

  constructor(
    private storageService: StorageService,
    private alertaService: AlertasService,
    private clashProvider: ClashProvider,
    private navController: NavController,
    private modalProvider: ModalProvider
  ) { }

  ngOnInit() {

    this.infoPlayer = Convert.toPlayerInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.PLAYER_KEY')));
    this.chestInfo = ConvertChest.toChestInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CHEST_KEY')));
    if (this.infoPlayer !== null) {
      this.titulo = this.infoPlayer.name;
      this.tagPlayer = _.replace(this.infoPlayer.tag, '#', '');
      if (_.get(this.infoPlayer, 'clan', '') === '') {
        this.existeClan = false;
      }
    } else {
      // tslint:disable-next-line: max-line-length
      const mensaje = 'No hay información para desplegar de tu perfil. Ve a Configuración en el menú superior izquierdo para establecer tu tag.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }
  }

  ionViewDidEnter() {
    // this.graficoBatallas();
  }

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

  actualizar() {
    this.alertaService.showLoading('Actualizando información...');

    const cbOk = response => {
      this.infoPlayer = _.get(response, 'playerInfo');
      this.chestInfo = _.get(response, 'incomingChests');
      const playerInfo = Convert.toPlayerInfo(JSON.stringify(this.infoPlayer));
      const incomingChest = ConvertChest.toChestInfo(JSON.stringify(this.chestInfo));
      this.storageService.setData(_.get(CONST, 'GENERAL.PLAYER_KEY'), playerInfo);
      this.storageService.setData(_.get(CONST, 'GENERAL.CHEST_KEY'), incomingChest);
      this.alertaService.hideLoading();
    };

    const cbError = () => {
      this.alertaService.hideLoading();
      const data = {
        title: 'Atención',
        message: 'Ocurrio un error en la ejecución de uno de los servicios.'
      };
      this.alertaService.mostrarAlerta(data);
    };

    this.clashProvider.getInfoJugador(this.tagPlayer).subscribe(cbOk, cbError);
  }

  changeSegment() {
    this.contentArea.scrollToTop(500);
    if (this.perfilSegment === 'playerBattles') {
        this.battleLog();
    }
  }

  private battleLog() {
    this.alertaService.showLoading('Obteniendo información...');

    const cbOK = response => {
      this.alertaService.hideLoading();
      this.battleInfo = _.get(response, 'battleLog');
      this.cargado = true;
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      console.log(error);
    };

    this.clashProvider.battleLog(this.tagPlayer).subscribe(cbOK, cbError);
  }

  async detalles(indice: any) {
    console.log(indice);
    const modal = await this.modalProvider.detalleBatalla(indice);
    return modal.present();
  }

}
