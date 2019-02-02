import { PatroliServiceProvider } from "./../../providers/patroli-service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { GeneralServiceProvider } from "../../providers/general-service";
declare var google;
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("map")
  mapElement: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public general: GeneralServiceProvider,
    public patroli: PatroliServiceProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadMap();
    this.getListHotspot();
  }
 
  loadMap() {
    let latLng = new google.maps.LatLng("-2.548926","115.3934693");
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


  getListHotspot(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
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
          this.addMarker(latLng, d[i][2]);
        }
        loading.dismiss();
      },
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  }
  //menambahakan marker
  addMarker(latLong, info) {
    let icon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      size: new google.maps.Size(50,50), // scaled size
      
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
