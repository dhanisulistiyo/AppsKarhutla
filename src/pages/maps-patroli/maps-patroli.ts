import { PatroliServiceProvider } from "./../../providers/patroli-service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { GeneralServiceProvider } from "../../providers/general-service";
import { FunctionServiceProvider } from "../../providers/function-service";
declare var google;

@Component({
  selector: "page-maps-patroli",
  templateUrl: "maps-patroli.html"
})
export class MapsPatroliPage {
  @ViewChild("map")
  mapElement: ElementRef;
  map: any;
  isHotspot = false;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public general: GeneralServiceProvider,
    public patroli: PatroliServiceProvider,
    public loadingCtrl: LoadingController,
    public fs: FunctionServiceProvider
  ) {}

  ionViewWillEnter() {
    this.loadMap();
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
    console.log(this.isHotspot);
    if (this.isHotspot) {
      let loading = this.loadingCtrl.create({
        content: "Mohon tunggu. Mengambil data hotspot ...",
        enableBackdropDismiss: true
      });
      loading.present();

      this.patroli.getListDataHotspot().subscribe(
        data => {
          console.log(data.data.hotspot);
          let d = data.data.hotspot ? data.data.hotspot : [];
          this.patroli.DataHotspot = d;
          for (let i = 0; i < d.length; i++) {
            let latLng = new google.maps.LatLng(d[i][0], d[i][1]);
            this.addMarker(latLng, d[i][2], "hotspot");
          }
          loading.dismiss();
        },
        err => {
          loading.dismiss();
          console.log(err);
        }
      );
    }
  }

  getListPatroli() {
    let loading = this.loadingCtrl.create({
      content: "Mohon tunggu. Mengambil data patorli ...",
      enableBackdropDismiss: true
    });
    loading.present();

    this.patroli.getListPatroliByDate(this.fs.getStringDate()).subscribe(
      data => {
        console.log(data.data);
        let Patroli = data.data;
        for (let i = 0; i < Patroli.length; i++) {
          let Darat = Patroli[i].patroli_darat;
          let Udara = Patroli[i].patroli_udara;
          for (let i = 0; i < Darat.length; i++) {
            if (Darat[i].latitude != null) {
              let latLng = new google.maps.LatLng(
                Darat[i].latitude,
                Darat[i].longitude
              );
              this.addMarker(
                latLng,
                this.patroli.getInfo(Darat[i], true),
                "darat"
              );
            }
          }

          for (let i = 0; i < Udara.length; i++) {
            if (Udara[i].latitude != null) {
              let latLng = new google.maps.LatLng(
                Udara[i].latitude,
                Udara[i].longitude
              );
              this.addMarker(
                latLng,
                this.patroli.getInfo(Udara[i], false),
                "udara"
              );
            }
          }
        }
        loading.dismiss();
        this.getListHotspot();
      },
      err => {
        loading.dismiss();
        console.log(err);
        this.getListHotspot();
      }
    );
  }
  //menambahakan marker
  addMarker(latLong, info, isPatroli) {
    let url = null;
    if (isPatroli == "darat")
      url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    else if (isPatroli == "udara")
      url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
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
