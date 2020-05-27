import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ClashProvider } from './providers/clashservice.provider';
import { ClashService } from './providers/clashservice.service';
import { MiclanPageModule } from './pages/miclan/miclan.module';
import { PipesModule } from './pipes/pipes.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MiperfilPageModule } from './pages/miperfil/miperfil.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    PipesModule,
    AppRoutingModule,
    MiclanPageModule,
    MiperfilPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ClashProvider,
    ClashService,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
