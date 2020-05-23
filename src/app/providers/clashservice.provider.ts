import { Injectable } from '@angular/core';
import { ClashService } from './clashservice.service';
import { throwError, Observable, pipe } from 'rxjs';
import _ from 'lodash';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { MESSAGES } from '../constants/messages.const';
import { AlertasService } from '../shared/alertas.service';


@Injectable()
export class ClashProvider {

    constructor(
        private clashService: ClashService,
        private alertaService: AlertasService
    ) {}

    public validarTags(dataTag: any): Observable<any> {

        const resultMessage = {
            codigo: 200,
            mensaje: _.get(MESSAGES, 'ERRORS.GENERAL_ERROR'),
            playerTagValid: true,
            playerInfo: {},
            incomingChests: {},
            clanTagValid: true,
            clanInfo: {},
            clanWar: {}
        };
        let clanTag = '';

        const playerTag = _.get(dataTag, 'playerTag', '');

        const cbPlayerTag = response => {
            if (_.get(response, 'reason') === 'notFound') {
                resultMessage.playerTagValid = false;
            } else {
                resultMessage.playerInfo = response;
                clanTag = _.replace(_.get(response, 'clan.tag'), '#', '');
            }
            return this.buscarClanTag(clanTag);
        };

        const cbClanTag = response => {
            if (_.get(response, 'reason') === 'notFound') {
                resultMessage.clanTagValid = false;
            } else {
                resultMessage.clanInfo = response;
            }
            return this.getIncomingChests(playerTag);
        };

        const cbIncomingChests = response => {
            if (_.get(response, 'reason') !== 'notFound') {
                resultMessage.incomingChests = response;
            }

            return this.getClanWar(clanTag);
        };

        const cbClanWar = response => {
            if (_.get(response, 'reason') !== 'notFound') {
                resultMessage.clanWar = response;
            }

            return resultMessage;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getInfoJugador(playerTag)
            .pipe(mergeMap(cbPlayerTag))
            .pipe(mergeMap(cbClanTag))
            .pipe(mergeMap(cbIncomingChests))
            .pipe(map(cbClanWar))
            .pipe(catchError(cbError));
    }

    public buscarClanTag(clanTag: string): Observable<any> {

        const cbClanOk = response => {
            return response;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getClanInfo(clanTag)
            .pipe(map(cbClanOk))
            .pipe(catchError(cbError));
    }

    public getClanWar(clanTag: string): Observable<any> {
        const cbWarOk = response => {
            return response;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getWarInfo(clanTag)
            .pipe(map(cbWarOk))
            .pipe(catchError(cbError));
    }

    public getInfoJugador(playerTag: string): Observable<any> {

        const resultDatos = {
            playerInfo: {},
            incomingChests: {}
        };

        const cbOk = response => {
            resultDatos.playerInfo = response;
            return this.getIncomingChests(playerTag);
        };

        const cbOkChests = response => {
            resultDatos.incomingChests = response;
            return resultDatos;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getInfoJugador(playerTag)
            .pipe(mergeMap(cbOk))
            .pipe(map(cbOkChests))
            .pipe(catchError(cbError));
    }

    public getIncomingChests(playerTag: string): Observable<any> {
        const cbOk = response => {
            return response;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getIncomingChests(playerTag)
            .pipe(map(cbOk))
            .pipe(catchError(cbError));
    }

    public getClanInfo(clanTag: string): Observable<any> {
        const result = {
            clanInfo: {},
            clanWar: {}
        };

        const cbClanOk = response => {
            result.clanInfo = response;
            return this.getClanWar(clanTag);
        };

        const cbWarOk = response => {
            result.clanWar = response;
            return result;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getClanInfo(clanTag)
            .pipe(mergeMap(cbClanOk))
            .pipe(map(cbWarOk))
            .pipe(catchError(cbError));
    }

    public checkUpdate(appVersion: string): Observable<any> {
        const result = {
            code: 0,
            message: '',
            url: ''
        };

        const cbOK = response => {
            if (_.get(response, 'version') !== appVersion) {
                result.code = 200;
                result.message = 'Hay una actualización disponible para descargar.';
                result.url = _.get(response, 'url');
            }
            return result;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.checkUpdate()
            .pipe(map(cbOK))
            .pipe(catchError(cbError));
    }
}
