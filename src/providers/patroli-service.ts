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
  //mengambil data hotspot dari sipongi
  getListDataHotspot() {
    var response = this.http
      .get("http://sipongi.menlhk.go.id/action/indohotspot?satelit=")
      .map(res => res.json());
    return response;
  }

  //get all list patroli
  getListPatroli() {
    var url = this.conf.baseUrl + "/api/patroli/list";
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
  //get list patroli by date
  getListPatroliByDate(date) {
    var url = this.conf.baseUrl + "/api/patroli/list?tanggal_patroli=" + date;
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

  getInfo(par, isDarat) {
    let result;
    if (isDarat)
      result =
        "<div style='color:#000'><strong></strong><table style='background-color:transparent'><tr><td><b>Type Patroli</b></td><td width='20px' align='center'>:</td><td>Darat</td></tr><tr><td><b>Latitude</b></td><td width='20px' align='center'>:</td><td>" +
        par.latitude +
        "</td></tr><tr><td><b>Longitude</b></td><td width='20px' align='center'>:</td><td>" +
        par.longitude +
        "</td></tr><tr><td><b>Desa</b></td><td width='20px' align='center'>:</td><td><span class='balloon-podes' style='cursor:pointer;'><b><u>" +
        par.desa_kelurahan.nama +
        "</u></b></span></td></tr><tr><td><b>Kecamatan</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.nama +
        "</td></tr><tr><td><b>Kota/Kabupaten</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.kotakab.nama +
        "</td></tr><tr><td><b>Provinsi</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.kotakab.daops.provinsi.nama +
        "</td></tr></table></div>";
    else
      result =
        "<div style='color:#000'><strong></strong><table style='background-color:transparent'><tr><td><b>Type Patroli</b></td><td width='20px' align='center'>:</td><td>Udara</td></tr><tr><td><b>Latitude</b></td><td width='20px' align='center'>:</td><td>" +
        par.latitude +
        "</td></tr><tr><td><b>Longitude</b></td><td width='20px' align='center'>:</td><td>" +
        par.longitude +
        "</td></tr><tr><td><b>Desa</b></td><td width='20px' align='center'>:</td><td><span class='balloon-podes' style='cursor:pointer;'><b><u>" +
        par.desa_kelurahan.nama +
        "</u></b></span></td></tr><tr><td><b>Kecamatan</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.nama +
        "</td></tr><tr><td><b>Kota/Kabupaten</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.kotakab.nama +
        "</td></tr><tr><td><b>Provinsi</b></td><td width='20px' align='center'>:</td><td>" +
        par.desa_kelurahan.kecamatan.kotakab.daops.provinsi.nama +
        "</td></tr></table></div>";

    return result;
  }
}
