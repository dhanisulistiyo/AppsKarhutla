import { PatroliServiceProvider } from "./../../providers/patroli-service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { InputDataServiceProvider } from "../../providers/input-data-service";
declare var google;
/**
 * Generated class for the CurrentLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-current-location",
  templateUrl: "current-location.html"
})
export class CurrentLocationPage {
  @ViewChild("map")
  mapElement: ElementRef;
  map: any;
  index;
  par;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public patroli: PatroliServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public inpPatroli: InputDataServiceProvider
  ) {
    this.index = this.navParams.get("index");
    this.par = this.navParams.get("par");
    console.log(this.par);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CurrentLocationPage");
    this.loadMap();
  }

  getListHotspot() {
    if (this.patroli.DataHotspot.length > 0) {
      let d = this.patroli.DataHotspot;
      for (let i = 0; i < d.length; i++) {
        let latLng = new google.maps.LatLng(d[i][0], d[i][1]);
        this.addMarker(latLng, d[i][2], false);
      }
    } else
      this.patroli.getListDataHotspot().subscribe(
        data => {
          console.log(data.data.hotspot);
          let d = data.data.hotspot ? data.data.hotspot : [];
          this.patroli.DataHotspot = d;
          for (let i = 0; i < d.length; i++) {
            let latLng = new google.maps.LatLng(d[i][0], d[i][1]);
            this.addMarker(latLng, d[i][2], false);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  loadMap() {
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();
    this.geolocation
      .getCurrentPosition(options)
      .then(resp => {
        console.log("inside func:", resp);
        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.inpPatroli.insertLocation(
          this.index,
          this.par,
          resp.coords.longitude,
          resp.coords.latitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 9,
          mapTypeId: google.maps.MapTypeId.HYBRID,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
          },
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          fullscreenControl: false
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        this.addMarker(latLng, "<div>lokasi saat ini</div>", true);
        this.getListHotspot();
        loading.dismiss();
      })
      .catch(err => {
        this.showAlert(
          "Gagal",
          "Koneksi internet bermasalah atau izin aplikasi untuk akses cordinat tidak tersedia",
          false
        );
      });
  }

  addMarker(latLong, info, isPatroli) {
    let url = null;
    if (isPatroli)
      url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    else url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    let icon = {
      url: url,
      size: new google.maps.Size(50, 50) // scaled size
    };

    let marker = new google.maps.Marker({
      map: this.map,
      icon: icon,
      animation: google.maps.Animation.DROP,
      position: latLong
    });
    this.addInfoWindow(marker, info);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }

  goSave() {
    this.navCtrl.pop();
  }

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
