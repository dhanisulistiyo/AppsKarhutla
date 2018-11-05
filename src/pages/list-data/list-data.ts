import { DetailsDataPage } from "./../details-data/details-data";
import { InputDataKarhutlaPage } from "./../input-data-karhutla/input-data-karhutla";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { PatroliServiceProvider } from "../../providers/patroli-service";

/**
 * Generated class for the ListDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-list-data",
  templateUrl: "list-data.html"
})
export class ListDataPage {
  ListPatroli = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public patrol: PatroliServiceProvider) { }

  ionViewWillEnter() {
    console.log("ionViewDidLoad ListDataPage");
    this.patrol.getListPatroli().subscribe(data => {
      console.log(data.data)
      this.ListPatroli = data.data
    }, err => console.log(err));

  }

  goAddData = () => {
    this.navCtrl.push(InputDataKarhutlaPage);
  };

  goDetails = () => {
    this.navCtrl.push(DetailsDataPage);
  };
}
