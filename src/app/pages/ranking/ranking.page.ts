import { Component, OnInit, ViewChild } from '@angular/core';
import { ClashProvider } from 'src/app/providers/clashservice.provider';
import { AlertasService } from 'src/app/shared/alertas.service';
import { Item } from 'src/app/models/rankplayers.model';
import { IonInfiniteScroll } from '@ionic/angular';
import _ from 'lodash';
import { ModalProvider } from '../modals/modal.provider';
import { ItemClan } from 'src/app/models/rankclanes.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  topJugadores: Item[] = [];
  topJugadores2: Item[] = [];
  topClanes: ItemClan[] = [];
  topClanes2: ItemClan[] = [];
  aCargar = 0;
  aCargarClanes = 0;
  cargando = true;
  rankSegment = 'playersRank';
  isPlayersView = true;

  constructor(
    private clashProvider: ClashProvider,
    private alertaService: AlertasService,
    private modalProvider: ModalProvider
  ) { }

  ngOnInit() {
    this.getRankPlayers();
  }

  private getRankClans() {
    this.alertaService.showLoading('Obteniendo info...');
    const cbOK = response => {
      this.alertaService.hideLoading();
      this.topClanes = _.get(response, 'items');
      this.topClanes2.push(... this.topClanes.slice(this.aCargarClanes, this.aCargarClanes + 100));
      this.aCargarClanes = this.aCargarClanes + 100;
      this.cargando = false;
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      console.log(cbError);
    };

    this.clashProvider.getRankClans('57000055').subscribe(cbOK, cbError);

  }


  private getRankPlayers() {
    this.alertaService.showLoading('Obteniendo info...');
    const cbOK = response => {
      this.alertaService.hideLoading();
      this.topJugadores = _.get(response, 'items');
      this.topJugadores2.push(... this.topJugadores.slice(this.aCargar, this.aCargar + 100));
      this.aCargar = this.aCargar + 100;
      this.cargando = false;
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      console.log(cbError);
    };

    this.clashProvider.getRankPlayers('57000055').subscribe(cbOK, cbError);
  }

  cargarDatosJugadores(event) {
    setTimeout(() => {
      if (this.aCargar > 1000) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      this.topJugadores2.push(... this.topJugadores.slice(this.aCargar, this.aCargar + 100));
      this.aCargar = this.aCargar + 100;
      event.target.complete();
    }, 1000);
  }

  cargarDatosClanes(event) {
    setTimeout(() => {
      if (this.aCargarClanes > 1000) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      this.topClanes2.push(... this.topClanes.slice(this.aCargarClanes, this.aCargarClanes + 100));
      this.aCargarClanes = this.aCargarClanes + 100;
      event.target.complete();
    }, 1000);
  }

  async mostrar(tag: string) {
    this.alertaService.showLoading('Obteniendo info...');
    const finalTag = tag.replace('#', '');

    const cbOk = async response => {
      this.alertaService.hideLoading();
      const modal = await this.modalProvider.infoPerfil(response, true);
      return modal.present();
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      console.log(error);
    };

    this.clashProvider.getInfoJugador(finalTag).subscribe(cbOk, cbError);

  }

  changeSegment() {
    if (this.rankSegment === 'playersRank') {
      this.aCargar = 0;
      this.topJugadores = [];
      this.topJugadores2 = [];
      this.getRankPlayers();
      this.isPlayersView = true;
    } else {
      this.isPlayersView = false;
      this.topClanes = [];
      this.topClanes2 = [];
      this.aCargarClanes = 0;
      this.getRankClans();
    }
  }

}
