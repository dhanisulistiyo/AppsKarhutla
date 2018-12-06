import { DetailsDataPage } from "./../details-data/details-data";
import { InputDataKarhutlaPage } from "./../input-data-karhutla/input-data-karhutla";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { PatroliServiceProvider } from "../../providers/patroli-service";
import { ConfigProvider } from "../../providers/config";
import {
  PatroliDarat,
  DataPatroli,
  PatroliUdara
} from "../../providers/object-service";

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
  newData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public patrol: PatroliServiceProvider,
    public con: ConfigProvider
  ) {}

  ionViewWillEnter() {
    this.ListPatroli = [];
    console.log("ionViewDidLoad ListDataPage");
    this.patrol.getListPatroli().subscribe(
      data => {
        console.log(data.data);
        this.ListPatroli = data.data;
      },
      err => {
        console.log(err);
        let error = this.con.convertMessage(err);
        this.con.showAllert("Failed!", error);
      }
    );
  }

  goAddData = type => {
    console.log(type);
    this.navCtrl.push(InputDataKarhutlaPage, { type, value: "new" });
  };

  goEditData = i => {
    let item = this.ListPatroli[i];
    this.newData = new DataPatroli();
    if (item.patroli_darat.length > 0) {
      this.newData.patroli_darat = new PatroliDarat();
      this.newData.patroli_darat = item.patroli_darat[0];
    } else {
      this.newData.patroli_udara = new PatroliUdara();
      this.newData.patroli_udara = item.patroli_udara[0];
    }
    this.newData.id = item.id;
    this.newData.tanggal_patroli = item.tanggal_patroli;
    this.newData.kategori_patroli_id = item.kategori_patroli_id;
    this.newData.inventori_patroli = item.inventori_patroli;
    this.newData.hotspot = item.hotspot;
    this.newData.aktivitas_harian_patroli = item.aktivitas_harian_patroli;
    this.newData.anggota_patroli = item.anggota_patroli;
    this.newData.images = [];
    console.log(this.newData);
    this.navCtrl.push(InputDataKarhutlaPage, {
      value: "edit",
      item: this.newData
    });
  };

  goDetails = () => {
    this.navCtrl.push(DetailsDataPage);
  };

  goDelete(id) {
    this.patrol.deletePatroli(id).subscribe(
      data => {
        console.log(data);
        this.con.showAllert("Success", data.message);
        this.ionViewWillEnter();
      },
      err => {
        console.log(err);
        let error = this.con.convertMessage(err);
        this.con.showAllert("Failed!", error);
      }
    );
  }
}
