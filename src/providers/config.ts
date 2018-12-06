
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  baseUrl;
  constructor( public alertCtrl : AlertController) {
    console.log("Hello ConfigProvider Provider");
    // this.baseUrl = "http://localhost:8080/siavipala/public";
    this.baseUrl = "http://103.129.220.174/siavipala/public"
  }

  convertMessage(err){
    if(err.status == 0) return 'Masalah Koneksi'
    else  return JSON.parse(err['_body']).message
  }

  showAllert(status,text) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
