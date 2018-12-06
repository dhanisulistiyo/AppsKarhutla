import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "./config";
import { AuthServiceProvider } from "./auth-service";

/*
  Generated class for the PatroliServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatroliServiceProvider {
  DataHotspot = [];
  constructor(
    public http: Http,
    public conf: ConfigProvider,
    public auth: AuthServiceProvider
  ) {
    console.log("Hello PatroliServiceProvider Provider");
  }

  getListDataHotspot() {
    var response = this.http
      .get("http://sipongi.menlhk.go.id/action/indohotspot?satelit=")
      .map(res => res.json());
    return response;
  }

  //get list patroli all
  getListPatroli() {
    var url = this.conf.baseUrl + "/api/patroli/list";
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  deletePatroli(id) {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/patroli/delete";
    var item = {
      kegiatan_patroli_id: id
    };
    var response = this.http
      .post(url, item, { headers: headers })
      .map(res => res.json());
    return response;
  }

  createPatroli(par) {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/patroli/create";
    var response = this.http
      .post(url, par, { headers: headers })
      .map(res => res.json());
    return response;
  }

  updatePatroli(par) {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/patroli/update";
    var response = this.http
      .post(url, par, { headers: headers })
      .map(res => res.json());
    return response;
  }
}
