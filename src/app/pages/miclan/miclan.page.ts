import { Component, OnInit } from '@angular/core';
import { ClanInfo, ConvertClan } from 'src/app/models/clan.model';
import { StorageService } from 'src/app/shared/storage.service';
import _ from 'lodash';
import { CONST } from 'src/app/constants/general.const';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-miclan',
  templateUrl: './miclan.page.html',
  styleUrls: ['./miclan.page.scss'],
})
export class MiclanPage implements OnInit {

  public infoClan: ClanInfo;
  public clanSegment = 'clanInfo';

  constructor(
    private storageService: StorageService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.infoClan = ConvertClan.toClanInfo(this.storageService.getDataSinParse(_.get(CONST, 'GENERAL.CLAN_KEY')));
    console.log(this.infoClan);
    if (this.infoClan === null) {
      // tslint:disable-next-line: max-line-length
      const mensaje = 'OH! OH! Al parecer no perteneces a ningún clan.';
      this.navController.navigateRoot('error', {queryParams: { mensaje }, animated: true});
    }

  }

  private getClanInfo() {

  }

}
