import { Injectable } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ModalProvider {
    constructor(
        private modalCtrl: ModalController
    ) {}

    async infoPerfil(data: any) {
        const modal = await this.modalCtrl.create({
            componentProps: {
                infoPlayer: _.get(data, 'playerInfo'),
                chestInfo: _.get(data, 'incomingChests')
            },
            component: PerfilComponent
        });

        return modal;
    }
}