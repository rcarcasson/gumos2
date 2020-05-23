import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import _ from 'lodash';
import { ENDPOINTS } from '../constants/endpoints.const';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClashService {

  private endpoint = '';
  private proxyURL = _.get(ENDPOINTS, 'PROXY.GET_PROXY_URL', '');

  constructor( private http: HttpClient ) { }

  private cbFailure(error: Response) {
    let auxResponse: any = {
      estado: {
        codigoEstado: 555,
        glosaEstado: 'Ocurrio un error en la ejecución de uno de los servicios.'
      }
    };
    try {
      auxResponse = error.json();
    } catch { }
    return throwError(auxResponse);
  }

  public getInfoJugador(tag: string): Observable<any> {
    this.endpoint = _.get(ENDPOINTS, 'PLAYER.GET_INFO', '');
    this.endpoint = _.replace(this.endpoint, '{playerTag}', tag);
    const finalProxyURL = _.replace(this.proxyURL, '{url}', this.endpoint);

    return this.http.get(finalProxyURL)
      .pipe(catchError(this.cbFailure));
  }

  public getClanInfo(clanTag: string): Observable<any> {
    this.endpoint = _.get(ENDPOINTS, 'CLAN.GET_INFO', '');
    this.endpoint = _.replace(this.endpoint, '{clanTag}', clanTag);
    const finalProxyUrl = _.replace(this.proxyURL, '{url}', this.endpoint);

    return this.http.get(finalProxyUrl)
      .pipe(catchError(this.cbFailure));
  }

  public getIncomingChests(tag: string): Observable<any> {
    this.endpoint = _.get(ENDPOINTS, 'PLAYER.GET_INCOMING_CHESTS', '');
    this.endpoint = _.replace(this.endpoint, '{playerTag}', tag);
    const finalProxyUrl = _.replace(this.proxyURL, '{url}', this.endpoint);

    return this.http.get(finalProxyUrl)
      .pipe(catchError(this.cbFailure));
  }

  public getWarInfo(clanTag: string): Observable<any> {
    this.endpoint = _.get(ENDPOINTS, 'CLAN.GET_CURRENT_WAR', '');
    this.endpoint = _.replace(this.endpoint, '{clanTag}', clanTag);
    const finalProxyUrl = _.replace(this.proxyURL, '{url}', this.endpoint);

    return this.http.get(finalProxyUrl)
      .pipe(catchError(this.cbFailure));
  }

  public checkUpdate(): Observable<any> {
    this.endpoint = _.get(ENDPOINTS, 'UPDATE.URL', '');

    return this.http.get(this.endpoint)
      .pipe(catchError(this.cbFailure));
  }
}
