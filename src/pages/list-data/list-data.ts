import { DetailsDataPage } from "./../details-data/details-data";
import { InputDataKarhutlaPage } from "./../input-data-karhutla/input-data-karhutla";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, AlertController } from "ionic-angular";
import { PatroliServiceProvider } from "../../providers/patroli-service";
import { ConfigProvider } from "../../providers/config";
import { GeneralServiceProvider } from "../../providers/general-service";
import { InputDataServiceProvider } from "../../providers/input-data-service";
import { FunctionServiceProvider } from "../../providers/function-service";

@Component({
  selector: "page-list-data",
  templateUrl: "list-data.html"
})
export class ListDataPage {
  ListPatroli = [];
  today
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public patrol: PatroliServiceProvider,
    public con: ConfigProvider,
    public loadingCtrl: LoadingController,
    public gen: GeneralServiceProvider,
    public inp: InputDataServiceProvider,
    public fs: FunctionServiceProvider,
    public alertCtrl: AlertController
  ) {
    this.today = this.fs.getStringDate();
  }

  ionViewWillEnter() {
    this.ListPatroli = [];
    console.log("ionViewDidLoad ListDataPage");
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();

    this.gen.getAllData(); // get all data for input patrol
    this.patrol.getListPatroliByDate(this.fs.getStringDate()).subscribe(
      data => {
        console.log(data.data);
        this.ListPatroli = data.data;
        loading.dismiss();
      },
      err => {
        console.log(err);
        let error = this.con.convertMessage(err);
        loading.dismiss();
        this.con.showAllert("Failed!", error);
      }
    );
  }

  goAddData = () => {
    this.inp.setPatroli(null);
    this.navCtrl.push(InputDataKarhutlaPage, { value: "new" });
  };

  goEditData = i => {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();
    let item = this.ListPatroli[i];
    this.inp.parsingData(item);
    loading.dismiss();
    this.navCtrl.push(InputDataKarhutlaPage, {
      value: "edit"
    });
  };

  goDetails = i => {
    console.log(this.ListPatroli[i]);
    this.navCtrl.push(DetailsDataPage, { patroli: this.ListPatroli[i] });
  };

  goDelete(id) {
    let confirm = this.alertCtrl.create({
      title: "Apakah anda yakin untuk menghapus laporan ini?",
      message: "",
      buttons: [
        {
          text: "Tidak!",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Ya!",
          handler: () => {
            console.log("Agree clicked");
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
      ]
    });
    confirm.present();
  }

  checkTime() {
    const date = new Date();
    const hours = date.getHours();
    const minute = date.getMinutes();
    if (hours >= 20) return false;
    else return true;
  }
}
