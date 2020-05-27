import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilComponent } from './perfil/perfil.component';
import _ from 'lodash';
import { DetallebatallaComponent } from './detallebatalla/detallebatalla.component';

@Injectable({
    providedIn: 'root'
})
export class ModalProvider {
    constructor(
        private modalCtrl: ModalController
    ) {}

    async infoPerfil(data: any, showHeart: boolean) {
        const modal = await this.modalCtrl.create({
            componentProps: {
                infoPlayer: _.get(data, 'playerInfo'),
                chestInfo: _.get(data, 'incomingChests'),
                showHeart
            },
            component: PerfilComponent
        });

        return modal;
    }

    async detalleBatalla(data: any) {
        const modal = await this.modalCtrl.create({
            componentProps: {
                battleInfo: data
            },
            component: DetallebatallaComponent
        });
        return modal;
    }
}
