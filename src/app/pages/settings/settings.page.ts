import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClashProvider } from '../../providers/clashservice.provider';
import { AlertasService } from 'src/app/shared/alertas.service';
import { StorageService } from 'src/app/shared/storage.service';
import { Convert } from 'src/app/models/player.model';
import { ConvertChest } from 'src/app/models/inc-chest.model';
import { CONST } from '../../constants/general.const';
import _ from 'lodash';
import { ConvertClan } from 'src/app/models/clan.model';
import { ConvertWarDay } from 'src/app/models/warday.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public formConfig: FormGroup;
  public personalTagValid = false;
  public clanTagValid = false;
  public mostrarResultados = false;
  public resultados: any;
  public guardar = false;
  private playerClanTag = '';

  constructor(
    private formBuilder: FormBuilder,
    private clashProvider: ClashProvider,
    private alertaService: AlertasService,
    private storageService: StorageService
  ) { }

  get playerTag() { return this.formConfig.get('playerTag'); }

  ngOnInit() {
    this.playerClanTag = this.storageService.getData(_.get(CONST, 'GENERAL.SETTINGS_KEY'));
    this.formConfig = this.formBuilder.group({
      playerTag: new FormControl(this.playerClanTag, Validators.required)
    });
  }

  public validar() {
    if (this.formConfig.valid) {

      this.validarTags();
    }
  }

  private validarTags() {
    this.alertaService.showLoading('Buscando...');
    const dataTags = {
      playerTag: this.playerTag.value
    };

    const cbOK = response => {
      this.alertaService.hideLoading();
      this.procesarRespuestaConfig(response);
    };

    const cbError = error => {
      this.alertaService.hideLoading();
      const data = {
        title: 'Atención',
        message: 'Ocurrio un error en la ejecución de uno de los servicios.'
      };
      this.alertaService.mostrarAlerta(data);
    };

    return this.clashProvider.validarTags(dataTags).subscribe(cbOK, cbError);

  }

  private procesarRespuestaConfig(data: any) {
    this.resultados = data;
    this.mostrarResultados = true;

    if (this.resultados.playerTagValid) {
      this.guardar = true;
    }
  }

  async guardarData() {
    if (!this.guardar) {
      const alerta = {
        title: 'Atención',
        message: 'Debes consultar por tu TAG de jugador para poder continuar.'
      };
      this.alertaService.mostrarAlerta(alerta);
      return;
    }

    const playerInfo = Convert.toPlayerInfo(JSON.stringify(this.resultados.playerInfo));
    const chestPlayerInfo = ConvertChest.toChestInfo(JSON.stringify(this.resultados.incomingChests));
    const clanInfo = ConvertClan.toClanInfo(JSON.stringify(this.resultados.clanInfo));
    const clanWar = ConvertWarDay.toWarDay(JSON.stringify(this.resultados.clanWar));
    this.storageService.setData(_.get(CONST, 'GENERAL.SETTINGS_KEY'), this.playerTag.value);
    this.storageService.setData(_.get(CONST, 'GENERAL.PLAYER_KEY'), playerInfo);
    this.storageService.setData(_.get(CONST, 'GENERAL.CHEST_KEY'), chestPlayerInfo);
    this.storageService.setData(_.get(CONST, 'GENERAL.CLAN_KEY'), clanInfo);
    this.storageService.setData(_.get(CONST, 'GENERAL.WAR_KEY'), clanWar);
    this.alertaService.mostrarToast('Información guardada');
  }

}
