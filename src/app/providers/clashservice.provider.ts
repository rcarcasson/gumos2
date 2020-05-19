import { Injectable } from '@angular/core';
import { ClashService } from './clashservice.service';
import { throwError, Observable, pipe } from 'rxjs';
import _ from 'lodash';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { MESSAGES } from '../constants/messages.const';


@Injectable()
export class ClashProvider {

    constructor(
        private clashService: ClashService,
    ) {}

    public validarTags(dataTag: any): Observable<any> {

        const resultMessage = {
            codigo: 200,
            mensaje: _.get(MESSAGES, 'ERRORS.GENERAL_ERROR'),
            playerTagValid: true,
            playerInfo: {},
            clanTagValid: true,
            clanInfo: {},
            incomingChests: {}
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

            return resultMessage;
        }

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getInfoJugador(playerTag)
            .pipe(mergeMap(cbPlayerTag))
            .pipe(mergeMap(cbClanTag))
            .pipe(map(cbIncomingChests))
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
        }

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
}
