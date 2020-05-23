import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import _ from 'lodash';


@Injectable({
    providedIn: 'root'
})

export class AlertasService {
    private spinner: any;
    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private iab: InAppBrowser
    ) {}

    async showLoading(message?: string) {
        this.spinner = await this.loadingController.create({
            message,
            spinner: 'crescent',
            showBackdrop: true
        });
        await this.spinner.present();
    }

    async hideLoading() {
        return await this.loadingController.getTop().then(loadingPresent => {
            if (loadingPresent) {
                return this.loadingController.dismiss(true);
            } else {
                return null;
            }
        });
    }

    async mostrarAlerta(data: any) {
        const alerta = await this.alertController.create({
            header: _.get(data, 'title'),
            message: _.get(data, 'message'),
            backdropDismiss: false,
            buttons: ['Aceptar']
        });
        return alerta.present();
    }

    async mostrarToast(data: string) {
        const toast = await this.toastController.create({
            message: data,
            duration: 2000
        });
        return toast.present();
    }

    async descargarUpdate(data: any) {
        const alerta = await this.alertController.create({
            header: _.get(data, 'title'),
            message: _.get(data, 'message'),
            buttons: [
                {
                    text: 'Cerrar',
                    role: 'close',
                },
                {
                    text: 'Descargar',
                    role: 'download',
                    cssClass: 'secondary',
                    handler: () => {
                        this.iab.create(_.get(data, 'url'), '_system');
                    }
                }
            ]
        });
        return alerta.present();
    }

}
