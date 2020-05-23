import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ClashProvider } from 'src/app/providers/clashservice.provider';
import { AlertasService } from './shared/alertas.service';
import _ from 'lodash';
import { CONST } from './constants/general.const';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  darkMode = true;
  public appVer: string;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Mi Perfil',
      url: 'miperfil',
      icon: 'person'
    },
    {
      title: 'Mi Clan',
      url: 'miclan',
      icon: 'skull'
    },
    {
      title: 'Favoritos',
      url: 'favoritos',
      icon: 'heart'
    },
    {
      title: 'Configuración',
      url: 'settings',
      icon: 'settings'
    },
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private clashProvider: ClashProvider,
    private alertaService: AlertasService
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
    });
  }

  ngOnInit() {
    if (localStorage.getItem('favPlayer') === null) {
      localStorage.setItem('favPlayer', JSON.stringify([]));
    }
    this.appVer = _.get(CONST, 'GENERAL.VERSION');
  }

  ionViewDidEnter() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.checkUpdate();
    }
  }

  checkUpdate() {
    this.alertaService.showLoading('Buscando actualización...');

    const cbOK = response => {
      this.alertaService.hideLoading();
      if (_.get(response, 'code', '') === 200) {
        const alerta = {
          title: 'Actualización disponible',
          message: _.get(response, 'message', ''),
          url: _.get(response, 'url', '')
        };
        this.alertaService.descargarUpdate(alerta);
      } else {
        const alerta = {
          title: 'Atención',
          message: 'Ya tienes la versión más reciente de la aplicación.'
        };
        this.alertaService.mostrarAlerta(alerta);
      }
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      setTimeout(() => {
        const alerta = {
          title: 'Atención',
          message: _.get(error, 'estado.glosaEstado')
        };
        this.alertaService.mostrarAlerta(alerta);
      }, 250);
    };

    this.clashProvider.checkUpdate(this.appVer).subscribe(cbOK, cbError);
  }
}
