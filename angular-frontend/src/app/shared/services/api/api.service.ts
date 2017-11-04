import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {RestfulHttpService} from '../restful-api/restful-http.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Iresponse} from '../../interfaces/Iresponse';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ApiService extends RestfulHttpService {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Delete request
   * @param {string} method
   * @param data
   * @returns {Observable<any>}
   */
  deleteRequest(method: string , data: any) {
    const ENDPOINT =  environment.endpoint + method;
    return super.delete(ENDPOINT, data).map((res: Response) => {
      const response = res.json();
      return response;
    })
  }

  /**
   *
   * Put  request
   * @param method
   * @param data
   * @returns {Observable<R>}
   */
  putRequest(method: string , data: any): Observable<Iresponse> {
    const ENDPOINT = environment.endpoint +  method;
    return super.put(ENDPOINT, data).map((res: Response) => {
      const response = res.json();
      return response;
    });

  }

  /**
   *
   * Get request
   * Makes a get request
   * @param method The method
   * @returns {Observable<R>}
   */
  getRequest(method: string , params?: URLSearchParams): Observable<Iresponse> {
    const ENDPOINT =  environment.endpoint +  method;
    return super.get(ENDPOINT, params).map((res: Response) => {
      const response = res.json();
      return response;
    });
  }


  /**
   *
   *
   * Post request
   * @param method The method to call
   * @param data The input parameters
   */
  postRequest(method: string , data: any): Observable<Iresponse> {
    const ENDPOINT =  environment.endpoint + method;
    return super.post(ENDPOINT, data).map((res: Response) => {
      const response = res.json();
      return response;
    });

  }
}
