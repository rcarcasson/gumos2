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
import { ActivatedRoute } from '@angular/router';

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
  public existeClan = true;
  public otroClan = false;
  public externalClanTag = '';
  public eventDay = '';

  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private alertaService: AlertasService,
    private clashProvider: ClashProvider,
    private modalProvider: ModalProvider,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.otroClan) {
        this.otroClan = true;
        this.infoClan = _.get(params, 'info.infoClan');
        this.infoWar = _.get(params, 'info.infoWar');
        this.updateImage();
      } else {
        this.infoClan = ConvertClan.toClanInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CLAN_KEY')));
        this.infoWar = ConvertWarDay.toWarDay(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.WAR_KEY')));
        if (this.infoClan === null || _.get(this.infoClan, 'name', '') === '') {
          this.existeClan = false;
          const mensaje = 'OH! OH! Al parecer no perteneces a ningún clan.';
          this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
        } else {
          this.updateImage();
        }
      }
    });

  }

  private updateImage() {
    this.evento = _.get(this.infoWar, 'state', '');
    if (this.evento === 'warDay') {
      this.eventDay = 'Día de Guerra';
      this.urlBanner = '../../../assets/ui-icons/waricon.png';
    } else {
      this.eventDay = 'Día de Recolección';
      this.urlBanner = '../../../assets/ui-icons/cards.png';
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
