import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import _ from 'lodash';


@Injectable({
    providedIn: 'root'
})

export class AlertasService {
    private spinner: any;
    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController,
        private toastController: ToastController
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

}
