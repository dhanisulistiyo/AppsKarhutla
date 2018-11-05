import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from './config';

/*
  Generated class for the PatroliServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatroliServiceProvider {

  constructor(public http: Http, public conf: ConfigProvider) {
    console.log('Hello PatroliServiceProvider Provider');
  }


  getListPatroli() {
    var url = this.conf.baseUrl + '/api/patroli/list';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


}
