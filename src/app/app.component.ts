import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  darkMode = true;
  protected appVer: string;
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
    private appVersion: AppVersion
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
    this.appVersion.getVersionNumber().then( (versionNumber) => {
      this.appVer = versionNumber;
    },
    (error) => {
      this.appVer = '';
    });
  }
}
