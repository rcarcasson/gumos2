import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertasService } from 'src/app/shared/alertas.service';
import { ModalProvider } from '../modals/modal.provider';
import { ClashProvider } from 'src/app/providers/clashservice.provider';
import _ from 'lodash';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public favs = [];
  public hayFavs = false;

  constructor(
    private navController: NavController,
    private alertaService: AlertasService,
    private modalProvider: ModalProvider,
    private clashProvider: ClashProvider
  ) { }

  ngOnInit() {
    this.favs = JSON.parse(localStorage.getItem('favPlayer'));
    if (this.favs.length > 0) {
      this.hayFavs = true;
    } else {
      const mensaje = 'No tienes favoritos para desplegar. Ve a Mi Clan -> Miembros y agrega a alguien desde su ficha de jugador.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }
  }

  mostrar(tag: string) {
    this.alertaService.showLoading('Obteniendo info...');
    const finalTag = tag.replace('#', '');

    const cbOk = async response => {
      this.alertaService.hideLoading();
      const modal = await this.modalProvider.infoPerfil(response, false);
      return modal.present();
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      console.log(error);
    };

    this.clashProvider.getInfoJugador(finalTag).subscribe(cbOk, cbError);

  }

  borrar(name: string) {
    const removidos = _.remove(this.favs, (p) => p.playerName === name );
    localStorage.setItem('favPlayer', JSON.stringify(this.favs));
    if (this.favs.length === 0) {
      const mensaje = 'No tienes favoritos para desplegar. Ve a Mi Clan -> Miembros y agrega a alguien desde su ficha de jugador.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }
  }

}
