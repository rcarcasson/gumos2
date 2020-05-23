import { Component, OnInit, ViewChild } from '@angular/core';
import { ClanInfo, ConvertClan } from 'src/app/models/clan.model';
import { StorageService } from 'src/app/shared/storage.service';
import _ from 'lodash';
import { CONST } from 'src/app/constants/general.const';
import { NavController, IonContent } from '@ionic/angular';
import { WarDay, ConvertWarDay } from 'src/app/models/warday.model';
import { AlertasService } from 'src/app/shared/alertas.service';
import { ClashProvider } from 'src/app/providers/clashservice.provider';
import { ModalProvider } from '../modals/modal.provider';

@Component({
  selector: 'app-miclan',
  templateUrl: './miclan.page.html',
  styleUrls: ['./miclan.page.scss'],
})
export class MiclanPage implements OnInit {
  @ViewChild(IonContent, {static: false}) contentArea: IonContent;

  public infoClan: ClanInfo;
  public infoWar: WarDay;
  public clanSegment = 'clanInfo';
  public urlBanner = '';
  public evento = '';

  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private alertaService: AlertasService,
    private clashProvider: ClashProvider,
    private modalProvider: ModalProvider
  ) { }

  ngOnInit() {
    this.infoClan = ConvertClan.toClanInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CLAN_KEY')));
    this.infoWar = ConvertWarDay.toWarDay(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.WAR_KEY')));
    if (this.infoClan === null) {
      // tslint:disable-next-line: max-line-length
      const mensaje = 'OH! OH! Al parecer no perteneces a ningún clan.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }
    this.updateImage();

  }

  private updateImage() {
    this.evento = _.get(this.infoWar, 'state', '');
    if (this.evento === 'warDay') {
      this.urlBanner = '../../../assets/banner_war.jpeg';
    } else {
      this.urlBanner = '../../../assets/banner_col.jpeg';
    }
  }

  async mostrarPerfil(tag: string) {
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

  public update() {
    const clanTag = _.replace(_.get(this.infoClan, 'tag', ''), '#', '');
    this.alertaService.showLoading('Actualizando info...');

    const cbOk = response => {
      this.alertaService.hideLoading();
      this.storageService.setData(_.get(CONST, 'GENERAL.CLAN_KEY'), ConvertClan.toClanInfo(JSON.stringify(_.get(response, 'clanInfo'))));
      this.storageService.setData(_.get(CONST, 'GENERAL.WAR_KEY'), ConvertWarDay.toWarDay(JSON.stringify(_.get(response, 'clanWar'))));
      this.infoClan = ConvertClan.toClanInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CLAN_KEY')));
      this.infoWar = ConvertWarDay.toWarDay(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.WAR_KEY')));
      this.updateImage();
    };

    const cbError = error => {
      this.alertaService.hideLoading();
    };

    this.clashProvider.getClanInfo(clanTag).subscribe(cbOk, cbError);
  }

  public changeSegment() {
    if (this.clanSegment !== 'clanInfo') {
      this.contentArea.scrollToTop(500);
    }
  }

}