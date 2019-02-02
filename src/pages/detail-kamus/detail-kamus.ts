import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the DetailKamusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-detail-kamus",
  templateUrl: "detail-kamus.html"
})
export class DetailKamusPage {
  data: string = this.navParams.get("data");
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailKamusPage");
  }
}
