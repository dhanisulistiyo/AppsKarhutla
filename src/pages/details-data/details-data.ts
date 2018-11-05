import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the DetailsDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-details-data",
  templateUrl: "details-data.html"
})
export class DetailsDataPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailsDataPage");
  }
}
