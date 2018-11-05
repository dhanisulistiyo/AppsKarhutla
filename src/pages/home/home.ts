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
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public general: GeneralServiceProvider) { }

  ionViewDidLoad() {
    this.loadMap();
    this.general.getListKategoriPatroli();
    this.general.getListDesa();
    this.general.getListCuaca();
    this.general.getListCurahHujan();
    this.general.getListArtifisial();
    this.general.getListSumberAir();
    this.general.getListAktivitasHarian();
    this.general.getListKategoriAnggota();
    this.general.getListAnggota();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then(
      position => {
        let latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
      },
      err => {
        console.log(err);
      }
    );
  }
  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
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
