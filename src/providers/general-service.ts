import { Http, Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { ConfigProvider } from "./config";
import 'rxjs/add/operator/map';
import { AuthServiceProvider } from './auth-service';

@Injectable()
export class GeneralServiceProvider {
  KategoriPatroli = []
  JenisPatroli = []
  ListDesa = []
  ListCuaca = []
  ListCurahHujan = []
  ListArtifisial = []
  ListSumberAir = []
  ListAktivitas = []
  ListKategoriAnggota = []
  ListAnggota = []
  constructor(public http: Http, public conf: ConfigProvider, public auth: AuthServiceProvider) {
    console.log("Hello GeneralServiceProvider Provider");
    this.JenisPatroli = ["DARAT", "UDARA"]
  }

  getListKategoriPatroli() {
    var url = this.conf.baseUrl + '/api/kategori-patroli/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.KategoriPatroli = data.data;
    }, err => console.log(err));
  }
  getListDesa() {
    var url = this.conf.baseUrl + '/api/desakelurahan/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListDesa = data.data;
    }, err => console.log(err));
  }
  getListCuaca() {
    var url = this.conf.baseUrl + '/api/cuaca/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListCuaca = data.data;
    }, err => console.log(err));

  }
  getListCurahHujan() {
    var url = this.conf.baseUrl + '/api/curah-hujan/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListCurahHujan = data.data;
    }, err => console.log(err));

  }
  getListArtifisial() {
    var url = this.conf.baseUrl + '/api/artifisial-param/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListArtifisial = data.data;
    }, err => console.log(err));

  }
  getListSumberAir() {
    var url = this.conf.baseUrl + '/api/sumber-air/list';
    return this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListSumberAir = data.data;
    }, err => console.log(err));
  }
  getListAktivitasHarian() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.conf.baseUrl + '/api/aktivitas-harian/list';
    return this.http.get(url, { headers: headers }).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListAktivitas = data.data;
    }, err => console.log(err));
  }
  getListKategoriAnggota() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.conf.baseUrl + '/api/kategori-anggota/list';
    return this.http.get(url, { headers: headers }).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListKategoriAnggota = data.data;
    }, err => console.log(err));
  }
  getListAnggota() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append('Authorization', 'Bearer ' + token);
    var url = this.conf.baseUrl + '/api/anggota/list';
    return this.http.get(url, { headers: headers }).map(res => res.json()).subscribe(data => {
      console.log(data.data)
      this.ListAnggota = data.data;
    }, err => console.log(err));
  }

}
