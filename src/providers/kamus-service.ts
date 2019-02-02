import { Injectable } from "@angular/core";

/*
  Generated class for the KamusServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KamusServiceProvider {
  listKamus = [];
  constructor() {
    console.log("Hello KamusServiceProvider Provider");
    this.listKamus = [
      {
        title: "Hotspot",
        deskripsi:
          "Titik panas atau hotspot adalah Indikator Kebakaran hutan yang mendeteksi suatu lokasi yang memiliki suhu relatif tinggi dibandingkan suhu disekitarnya."
      },
      {
        title: "FFMC KKAS",
        deskripsi:
          "Fine Fuel Moisture Code (FFMC), yang merupakan indikator kekeringan bahan bakar mati, sering digunakan sebagai prediktor penyebab kebakaran berupa manusia dan petir."
      },
      {
        title: "FWI",
        deskripsi:
          "Fire Weather Index (FWI), yang merupakan indikator umum dari bahaya kebakaran dan intesitas kebakaran."
      },
      {
        title: "DC KK",
        deskripsi:
          "Drought Code (DC), yang menujukkan tingkat kekeringan yang mendalam di lapisan organik yang kompak di lantai hutan."
      },
      { title: "Confidence", deskripsi: "Nilai kepercayaan." },
      {
        title: "Distance",
        deskripsi:
          "Jarak atau ruang sela (panjang atau jauh) antara dua benda atau tempat."
      },
      {
        title: "Radial",
        deskripsi: "Berkenaan dengan atau menyerupai jari-jari lingkaran."
      }
    ];
  }
}
