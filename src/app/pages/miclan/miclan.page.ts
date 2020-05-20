import { Component, OnInit, ViewChild } from '@angular/core';
import { ClanInfo, ConvertClan } from 'src/app/models/clan.model';
import { StorageService } from 'src/app/shared/storage.service';
import _ from 'lodash';
import { CONST } from 'src/app/constants/general.const';
import { NavController, IonContent } from '@ionic/angular';
import { WarDay, ConvertWarDay } from 'src/app/models/warday.model';

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

  constructor(
    private storageService: StorageService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.infoClan = ConvertClan.toClanInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CLAN_KEY')));
    this.infoWar = ConvertWarDay.toWarDay(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.WAR_KEY')));
    if (this.infoClan === null) {
      // tslint:disable-next-line: max-line-length
      const mensaje = 'OH! OH! Al parecer no perteneces a ningún clan.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }
    if (_.get(this.infoWar, 'state', '') === 'warDay') {
      this.urlBanner = '../../../assets/banner_war.jpeg';
    } else {
      this.urlBanner = '../../../assets/banner_col.jpeg';
    }

  }

  public update() {
    const clanTag = _.replace(_.get(this.infoClan, 'tag', ''), '#', '');
  }

  private getClanInfo() {

  }

  public changeSegment() {
    if (this.clanSegment !== 'clanInfo') {
      this.contentArea.scrollToTop(500);
    }
  }

}
