import { Component } from "@angular/core";
import { NavController, NavParams, ActionSheetController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { PatroliDarat } from "../../providers/object-service";
import { GeneralServiceProvider } from "../../providers/general-service";

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
  base64Image;
  Data
  //parameter
  KategoriPatroli
  JenisPatroli
  ListDesa
  ListCuaca
  ListCurahHujan
  ListArtifisial
  ListSumberAir
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public general: GeneralServiceProvider,
  ) {
    this.Data = new PatroliDarat()
    this.KategoriPatroli = this.general.KategoriPatroli
    this.JenisPatroli = this.general.JenisPatroli
    this.ListDesa = this.general.ListDesa
    this.ListCuaca = this.general.ListCuaca
    this.ListCurahHujan = this.general.ListCurahHujan
    this.ListArtifisial = this.general.ListArtifisial
    this.ListSumberAir = this.general.ListSumberAir
    console.log(this.Data)
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InputDataKarhutlaPage");
  }

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
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
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
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    };
    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.log(err);
      }
    );
  }
}
