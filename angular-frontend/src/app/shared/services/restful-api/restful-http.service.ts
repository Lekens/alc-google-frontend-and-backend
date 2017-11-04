import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptionsArgs,  URLSearchParams, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RestfulHttpService {
  http: Http;
  options: RequestOptionsArgs;
  constructor(http: Http) {
  this.http = http;
  }

  /**
   * Check if token is available and create request headers from decision
   * @param headers
   * @returns {boolean}
   */
  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-type', 'application/json');
    return true;
  }

  /**
   * A Restful Http get request.
   * @param endpoint The endpoint to call.
   * @param parameters
   * @return {Observable<Response>}
   */
  public get(endpoint: string, parameters?: URLSearchParams): Observable<Response> {
    const headers = new Headers();
    if (this.createAuthorizationHeader(headers)) {
      if (parameters) {
        this.options = {search: parameters, headers: headers}
      } else {
        this.options = {headers: headers};
      }
      return this.http.get(endpoint, this.options);

    };
  }

  /**
   * A Restful Http post request.
   * @param endpoint
   * @param data
   * @return {Observable<Response>}
   */
  public post(endpoint: string, data: any): Observable<Response> {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(endpoint, data, {  headers: headers });
  }

  /**
   * A Restful Http delete Request.
   * @param endpoint
   * @param data
   * @return {Observable<Response>}
   */
  public delete(endpoint: string , data: any) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    const params = new URLSearchParams();
    for (const key in  data) {
      if (key) {
        params.set(key, data[key]);
      }
    }
    return this.http.delete(endpoint, {headers: headers, search: params});

  }
  /**
   * A Restful Http put request.
   * @param endpoint
   * @param data
   * @return {Observable<Response>}
   */
  public put(endpoint: string, data: any): Observable<Response> {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(endpoint, data, {  headers: headers });
  }

}
