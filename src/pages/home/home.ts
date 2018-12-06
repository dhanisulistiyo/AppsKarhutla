import { hotspot } from "./../../providers/object-service";
import { PatroliServiceProvider } from "./../../providers/patroli-service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
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
    public patroli: PatroliServiceProvider
  ) {}

  ionViewDidLoad() {
    this.loadMap();
    this.patroli.getListDataHotspot().subscribe(
      data => {
        console.log(data.data.hotspot);
        let d = data.data.hotspot ? data.data.hotspot : [];
        this.patroli.DataHotspot = d;
        for (let i = 0; i < d.length; i++) {
          let latLng = new google.maps.LatLng(d[i][0], d[i][1]);
          this.addMarker(latLng, d[i][2]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  loadMap() {
    let latLng = new google.maps.LatLng("-2.5489", "118.0149");
    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(latLong, info) {
    let marker = new google.maps.Marker({
      map: this.map,
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
}
