
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
    this.baseUrl = "http://localhost:8080/siavipala/public";
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: "Failed!",
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
