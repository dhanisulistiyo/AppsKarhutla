import {
  PatroliDarat,
  PatroliUdara,
  hasilUji,
  kondisiSumberAir,
  kondisiVegetasi,
  kondisiTanah,
  pemadaman
} from "./../../providers/object-service";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DataPatroli, inventoriPatroli } from "../../providers/object-service";
import { GeneralServiceProvider } from "../../providers/general-service";
import { getStringDate } from "../../providers/function-service";
import { Geolocation } from "@ionic-native/geolocation";
import { CurrentLocationPage } from "../current-location/current-location";
import { PatroliServiceProvider } from "../../providers/patroli-service";

/**
 * Generated class for the InputDataKarhutlaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-input-data-karhutla",
  templateUrl: "input-data-karhutla.html"
})
export class InputDataKarhutlaPage {
  type;
  base64Image;
  Data;
  //parameter
  KategoriPatroli;
  JenisPatroli;
  ListDesa;
  ListCuaca;
  ListCurahHujan;
  ListArtifisial;
  ListSumberAir;
  ListAktivitas;
  ListKategoriAnggota;
  ListAnggota;
  ListTipeKebakaran;
  ListPemilikLahan;
  ListInventoriPatroli;
  ListTanah;
  ListVegetasi;
  ListSatelit;
  KondisiVegetasi;
  PotensiKarhutla;
  KondisiKarhutla;
  KeteranganLokasi;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public general: GeneralServiceProvider,
    public geolocation: Geolocation,
    public patroli: PatroliServiceProvider,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.data.value == "new") {
      this.type = this.navParams.data.type;
      this.Data = new DataPatroli();
      if (this.type == "DARAT") this.Data.patroli_darat = new PatroliDarat();
      else this.Data.patroli_udara = new PatroliUdara();
    } else {
      this.Data = this.navParams.data.item;
    }

    this.KategoriPatroli = this.general.KategoriPatroli;
    this.JenisPatroli = this.general.JenisPatroli;
    this.ListDesa = this.general.ListDesa;
    this.ListCuaca = this.general.ListCuaca;
    this.ListCurahHujan = this.general.ListCurahHujan;
    this.ListArtifisial = this.general.ListArtifisial;
    this.ListSumberAir = this.general.ListSumberAir;
    this.ListAktivitas = this.general.ListAktivitas;
    this.ListKategoriAnggota = this.general.ListKategoriAnggota;
    this.ListAnggota = this.general.ListAnggota;

    this.ListTipeKebakaran = this.general.ListTipeKebakaran;
    this.ListPemilikLahan = this.general.ListPemilikLahan;
    this.ListInventoriPatroli = this.general.ListInventoriPatroli;
    this.ListTanah = this.general.ListTanah;
    this.ListVegetasi = this.general.ListVegetasi;
    this.ListSatelit = this.general.ListSatelit;
    this.KondisiVegetasi = this.general.KondisiVegetasi;
    this.PotensiKarhutla = this.general.PotensiKarhutla;
    this.KondisiKarhutla = this.general.KondisiKarhutla;
    this.KeteranganLokasi = this.general.KeteranganLokasi;
  }

  ionViewWillEnter() {
    console.log("ionViewDidLoad InputDataKarhutlaPage");
    this.Data.tanggal_patroli = getStringDate();
    console.log(this.Data);
  }

  //get lokasi
  getlocation() {
    let val;
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    val = this.geolocation.getCurrentPosition(options).then(resp => {
      console.log("inside func:", resp);
      this.Data.patroli_darat.longitude = resp.coords.longitude;
      this.Data.patroli_darat.latitude = resp.coords.latitude;
      return resp;
    });
    console.log(val);
    return val;
  }
  getNewLocation(data) {
    console.log(data);
  }

  goMapDarat() {
    if (this.Data.patroli_darat.latitude != null) {
      let latLng = {
        latitude: this.Data.patroli_darat.latitude,
        longitude: this.Data.patroli_darat.longitude
      };

      this.navCtrl.push(CurrentLocationPage, { latLng });
    }
  }
  //Functin for take picture
  presentActionSheet = () => {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.accessGallery();
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.getImage();
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  };
  getImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.Data.images.push(this.base64Image);
        // imageData is either a base64 encoded string or a file URI
      },
      err => {
        // Handle error
        console.log(err);
      }
    );
  }
  accessGallery() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.Data.images.push(this.base64Image);
      },
      err => {
        console.log(err);
      }
    );
  }
  /////////////////////////////
  //Function add data
  actionSheetAddData = () => {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Tambah Data Observasi",
      buttons: [
        {
          text: "Tambah Hasil Uji",
          handler: () => {
            this.Data.patroli_darat.hasil_uji.push(new hasilUji());
          }
        },
        {
          text: "Tambah Kondisi Sumber Air",
          handler: () => {
            this.Data.patroli_darat.kondisi_sumber_air.push(
              new kondisiSumberAir()
            );
          }
        },
        {
          text: "Tambah Kondisi Vegetasi",
          handler: () => {
            this.Data.patroli_darat.kondisi_vegetasi.push(
              new kondisiVegetasi()
            );
          }
        },
        {
          text: "Tambah Kondisi Tanah",
          handler: () => {
            this.Data.patroli_darat.kondisi_tanah.push(new kondisiTanah());
          }
        },
        {
          text: "Tambah Data Pemadaman",
          handler: () => {
            this.Data.patroli_darat.pemadaman.push(new pemadaman());
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  };

  addInventory() {
    this.Data.inventori_patroli.push(new inventoriPatroli());
    console.log(this.Data.inventori_patroli);
  }
  deleteData(someArray, i) {
    someArray.splice(i, 1);
    console.log(this, this.Data);
  }

  goSave() {
    console.log(this.Data);
    if (this.navParams.data.value == "new") {
      this.patroli.createPatroli(this.Data).subscribe(
        data => {
          console.log(data);
          this.showAlertSuccess("Laporan berhasil disimpan");
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.patroli.updatePatroli(this.Data).subscribe(
        data => {
          console.log(data);
          this.showAlertSuccess("Laporan berhasil disimpan");
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  showAlertSuccess(msg) {
    const alert = this.alertCtrl.create({
      title: "Success!",
      subTitle: msg,
      buttons: [
        {
          text: "Ok",
          handler: data => {
            this.navCtrl.pop();
            console.log("Saved clicked");
          }
        }
      ]
    });
    alert.present();
  }
}
