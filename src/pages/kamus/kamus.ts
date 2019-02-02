import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { DetailKamusPage } from "../detail-kamus/detail-kamus";
import { KamusServiceProvider } from "../../providers/kamus-service";

@Component({
  selector: "page-kamus",
  templateUrl: "kamus.html"
})
export class KamusPage {
  Kamus;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public kamus: KamusServiceProvider
  ) {
    this.Kamus = this.kamus.listKamus;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad KamusPage");
    console.log(this.Kamus);
  }

  presentDetailModal(i) {
    this.navCtrl.push(DetailKamusPage, {
      data: this.Kamus[i]
    });
  }
}
