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
            clanInfo: {}
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
            return resultMessage;
        }

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getInfoJugador(playerTag)
            .pipe(mergeMap(cbPlayerTag))
            .pipe(map(cbClanTag))
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

        const cbOk = response => {
            return response;
        };

        const cbError = error => {
            return throwError(error);
        };

        return this.clashService.getInfoJugador(playerTag)
            .pipe(map(cbOk))
            .pipe(catchError(cbError));
    }
}
