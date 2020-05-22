import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private navController: NavController,
    private splashScreen: SplashScreen,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.splashScreen.hide();
    }, 1000);
  }

  navegar(url) {
    this.navController.navigateRoot(url);
  }

}
