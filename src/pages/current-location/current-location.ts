import { PatroliServiceProvider } from "./../../providers/patroli-service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
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
  callback;
  latLng;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public patroli: PatroliServiceProvider
  ) {
    this.callback = this.navParams.get("callback");
    this.latLng = this.navParams.get("latLng");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CurrentLocationPage");
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(
      this.latLng.latitude,
      this.latLng.longitude
    );
    let mapOptions = {
      center: latLng,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(latLng, "<div>lokasi saat ini</div>");
    this.loadHotspot();
  }

  loadHotspot() {
    for (let i = 0; i < this.patroli.DataHotspot.length; i++) {
      let latLng = new google.maps.LatLng(
        this.patroli.DataHotspot[i][0],
        this.patroli.DataHotspot[i][1]
      );
      this.addMarker(latLng, this.patroli.DataHotspot[i][2]);
    }
  }

  getCurrentLokasi() {
    let val;
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    val = this.geolocation.getCurrentPosition(options).then(resp => {
      console.log("inside func:", resp);
      let latLng = new google.maps.LatLng(
        resp.coords.latitude,
        resp.coords.longitude
      );

      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(latLng, "<div>lokasi saat ini</div>");
      console.log(val);
      this.loadHotspot();
      return resp;
    });
    return val;
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

  goSave() {
    this.navCtrl.pop();
    // this.callback(param).then(() => {
    //   this.navCtrl.pop();
    // });
  }
}
