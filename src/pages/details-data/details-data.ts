import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { PatroliServiceProvider } from "../../providers/patroli-service";
import { ConfigProvider } from "../../providers/config";
declare var google;
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
  @ViewChild("map")
  mapElement: ElementRef;
  map: any;
  Data;
  toggle: Array<{ info: any; icon: string; showDetails: boolean }> = [];
  baseImg;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public patroli: PatroliServiceProvider,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider
  ) {
    this.generateToggle();
    this.baseImg = this.config.baseImg
    this.Data = this.navParams.data.patroli;
    console.log(this.Data);
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
      info: "Peta",
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailsDataPage");
  }

  ionViewWillEnter() {
    this.loadMap();
    this.getListHotspot();
    this.getListPatroli();
  }

  loadMap() {
    let latLng = new google.maps.LatLng("-2.548926", "115.3934693");
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
      },
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getListHotspot() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      enableBackdropDismiss: true
    });
    loading.present();

    if (this.patroli.DataHotspot.length > 0) {
      let d = this.patroli.DataHotspot;
      for (let i = 0; i < d.length; i++) {
        let latLng = new google.maps.LatLng(d[i][0], d[i][1]);
        this.addMarker(latLng, d[i][2], false);
      }
      loading.dismiss();
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
          loading.dismiss();
        },
        err => {
          loading.dismiss();
          console.log(err);
        }
      );
  }

  getListPatroli() {
    let Darat = this.Data.patroli_darat;
    let Udara = this.Data.patroli_udara;
    for (let i = 0; i < Darat.length; i++) {
      if (Darat[i].latitude != null) {
        let latLng = new google.maps.LatLng(
          Darat[i].latitude,
          Darat[i].longitude
        );
        this.addMarker(latLng, this.patroli.getInfo(Darat[i], true), "darat");
      }
    }

    for (let i = 0; i < Udara.length; i++) {
      if (Udara[i].latitude != null) {
        let latLng = new google.maps.LatLng(
          Udara[i].latitude,
          Udara[i].longitude
        );
        this.addMarker(latLng, this.patroli.getInfo(Udara[i], false), "udara");
      }
    }
  }

  addMarker(latLong, info, isPatroli) {
    let url = null;
    if (isPatroli == "darat")
      url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    else if (isPatroli == "udara")
      url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    else url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    // 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    // https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png
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

  //menambahkan info maker
  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }
}
