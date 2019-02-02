import {
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
  AlertController,
  LoadingController
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { GeneralServiceProvider } from "../../providers/general-service";
import { FunctionServiceProvider } from "../../providers/function-service";
import { Geolocation } from "@ionic-native/geolocation";
import { CurrentLocationPage } from "../current-location/current-location";
import { PatroliServiceProvider } from "../../providers/patroli-service";
import { InputDataServiceProvider } from "../../providers/input-data-service";

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
  toggle: Array<{ info: any; icon: string; showDetails: boolean }> = [];
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
    public alertCtrl: AlertController,
    public fs: FunctionServiceProvider,
    public inpPatroli: InputDataServiceProvider,
    public loadingCtrl: LoadingController
  ) {
    this.generateToggle();
    this.Data = this.inpPatroli.Patroli; // get value data patroli
    console.log(this.Data);

    // get details input
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

  async generateToggle() {
    await this.toggle.push({
      info: "Data Umum",
      icon: "ios-arrow-dropdown-outline",
      showDetails: true
    });
    await this.toggle.push({
      info: "Data Patroli Darat",
      icon: "ios-arrow-dropdown-outline",
      showDetails: true
    });
    await this.toggle.push({
      info: "Data Patroli Udara",
      icon: "ios-arrow-dropdown-outline",
      showDetails: true
    });
    await this.toggle.push({
      info: "Dokumentasi",
      icon: "ios-arrow-dropdown-outline",
      showDetails: true
    });
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = "ios-arrow-dropright-outline";
    } else {
      data.showDetails = true;
      data.icon = "ios-arrow-dropdown-outline";
    }
  }

  async goAddData(par) {
    this.inpPatroli.addDataPatroliUdaraOrDarat(par);
  }

  ionViewWillEnter() {
    console.log("ionViewDidLoad InputDataKarhutlaPage");
  }

  //get Koordinat
  getCurrentLocation(index, par) {
    // par is "DARAT" or "UDARA"
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();

    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    this.geolocation
      .getCurrentPosition(options)
      .then(resp => {
        console.log("inside func:", resp);
        this.inpPatroli.insertLocation(
          index,
          par,
          resp.coords.longitude,
          resp.coords.latitude
        );
        loading.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        this.showAlert(
          "Gagal",
          "Izinkan aplikasi untuk akses izin lokasi pada device anda",
          false
        );
      });
  }

  goMap(index, par) {
    // par === DARAT or  UDARA
    this.navCtrl.push(CurrentLocationPage, { index, par });
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
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();
    this.camera.getPicture(options).then(
      imageData => {
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let img = {
          file: imageData,
          deskripsi: this.fs.getStringDate()
        };
        this.Data.images.push(img);
        this.Data.images.reverse();
        loading.dismiss();
        // imageData is either a base64 encoded string or a file URI
      },
      err => {
        // Handle error
        loading.dismiss();
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
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let img = {
          file: imageData,
          deskripsi: this.fs.getStringDate()
        };
        this.Data.images.push(img);
        this.Data.images.reverse();
        loading.dismiss();
      },
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  }
  /////////////////////////////

  //Function add data
  actionSheetAddData = index => {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Tambah Data Observasi",
      buttons: [
        {
          text: "Tambah Hasil Uji",
          handler: () => {
            this.Data.patroli_darat[index].hasil_uji.push(new hasilUji());
          }
        },
        {
          text: "Tambah Kondisi Sumber Air",
          handler: () => {
            this.Data.patroli_darat[index].kondisi_sumber_air.push(
              new kondisiSumberAir()
            );
          }
        },
        {
          text: "Tambah Kondisi Vegetasi",
          handler: () => {
            this.Data.patroli_darat[index].kondisi_vegetasi.push(
              new kondisiVegetasi()
            );
          }
        },
        {
          text: "Tambah Kondisi Tanah",
          handler: () => {
            this.Data.patroli_darat[index].kondisi_tanah.push(
              new kondisiTanah()
            );
          }
        },
        {
          text: "Tambah Data Pemadaman",
          handler: () => {
            this.Data.patroli_darat[index].pemadaman.push(new pemadaman());
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

  deleteData(someArray, i) {
    let confirm = this.alertCtrl.create({
      title: "Apakah anda yakin untuk menghapus data ini?",
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
            someArray.splice(i, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  // funtion for save and update data patroli
  goSave() {
    console.log(this.Data);
    console.log(this.inpPatroli.Patroli);
    let err = this.inpPatroli.validasiData(this.Data);
    if (err !== null) {
      console.log(err);
      this.showAlert("Gagal!", err, false);
      return 0;
    } else {
      let loading = this.loadingCtrl.create({
        content: "Please wait...",
        enableBackdropDismiss: true
      });
      loading.present();

      if (this.navParams.data.value == "new") {
        this.patroli.createPatroli(this.Data).subscribe(
          data => {
            loading.dismiss();
            console.log(data);
            this.showAlert("Sukses!", "Laporan berhasil diupdate", true);
          },
          err => {
            loading.dismiss();
            console.log(err);
            this.showAlert(
              "Gagal!",
              "Laporan tidak disimpan! Check koneksi internet atau coba lagi nanti.",
              false
            );
          }
        );
      } else {
        this.patroli.updatePatroli(this.Data).subscribe(
          data => {
            loading.dismiss();
            console.log(data);
            this.showAlert("Sukses!", "Laporan berhasil diupdate", true);
          },
          err => {
            loading.dismiss();
            console.log(err);
            this.showAlert(
              "Gagal!",
              "Laporan tidak disimpan! Check koneksi internet atau coba lagi nanti.",
              false
            );
          }
        );
      }
    }
  }

  // Allert for response
  showAlert(title, msg, status) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [
        {
          text: "Ok",
          handler: data => {
            if (status) this.navCtrl.pop();
            console.log("Saved clicked");
          }
        }
      ]
    });
    alert.present();
  }
}
