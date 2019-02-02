import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import {
  DataPatroli,
  PatroliDarat,
  PatroliUdara,
  kondisiSumberAir,
  kondisiVegetasi,
  kondisiTanah,
  pemadaman
} from "./object-service";
import { FunctionServiceProvider } from "./function-service";
import { GeneralServiceProvider } from "./general-service";

/*
  Generated class for the InputDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDataServiceProvider {
  Patroli;
  constructor(
    public http: Http,
    public fs: FunctionServiceProvider,
    public gen: GeneralServiceProvider
  ) {
    console.log("Hello InputDataServiceProvider Provider");
  }

  destroyDataPatroli() {
    this.Patroli = null;
  }

  setPatroli(par) {
    if (par == null) {
      this.Patroli = new DataPatroli();
      this.Patroli.tanggal_patroli = this.fs.getStringDate();
    } else {
      this.Patroli = par; //for edit data
    }
  }

  async addDataPatroliUdaraOrDarat(par) {
    if (par == "DARAT")
      await this.Patroli.patroli_darat.push(new PatroliDarat());
    else await this.Patroli.patroli_udara.push(new PatroliUdara());
  }

  insertLocation(index, type, longitude, latitude) {
    if (type == "DARAT") {
      this.Patroli.patroli_darat[index].longitude = longitude;
      this.Patroli.patroli_darat[index].latitude = latitude;
    } else {
      this.Patroli.patroli_udara[index].longitude = longitude;
      this.Patroli.patroli_udara[index].latitude = latitude;
    }
  }

  parsingData(par) {
    this.Patroli = new DataPatroli();
    this.Patroli.kegiatan_patroli_id = par.id;
    this.Patroli.tanggal_patroli = par.tanggal_patroli;
    this.Patroli.kategori_patroli_id = par.kategori_patroli
      ? par.kategori_patroli.id
      : null;

    let c = par.inventori_patroli;
    for (let i = 0; i < c.length; i++) {
      let item = this.gen.ListInventoriPatroli.find(
        item => item.inventori_id == c[i].inventori_id
      );
      this.Patroli.inventori_patroli.push(item);
    }

    c = par.hotspot;
    for (let i = 0; i < c.length; i++) {
      let item = this.gen.ListSatelit.find(
        item => item.satelit_id == c[i].satelit_id
      );
      this.Patroli.hotspot.push(item);
    }

    c = par.aktivitas_harian_patroli;
    for (let i = 0; i < c.length; i++) {
      let item = this.gen.ListAktivitas.find(
        item => item.aktivitas_harian_id == c[i].aktivitas_harian_id
      );
      this.Patroli.aktivitas_harian_patroli.push(item);
    }

    c = par.anggota_patroli;
    for (let i = 0; i < c.length; i++) {
      let item = this.gen.ListAnggota.find(
        item => item.anggota_id == c[i].anggota_id
      );
      this.Patroli.anggota_patroli.push(item);
    }

    this.Patroli.images = [];

    c = par.patroli_darat;
    for (let i = 0; i < c.length; i++) {
      let item = new PatroliDarat();
      item.latitude = c[i].latitude;
      item.longitude = c[i].longitude;
      item.desa_kelurahan_id = c[i].desa_kelurahan
        ? c[i].desa_kelurahan.id
        : null;
      item.cuaca_pagi_id = c[i].cuaca_pagi ? c[i].cuaca_pagi.id : null;
      item.cuaca_siang_id = c[i].cuaca_siang ? c[i].cuaca_siang.id : null;
      item.cuaca_sore_id = c[i].cuaca_sore ? c[i].cuaca_sore.id : null;
      item.curah_hujan_id = c[i].curah_hujan ? c[i].curah_hujan.id : null;
      item.potensi_karhutla_id = c[i].potensi_karhutla
        ? c[i].potensi_karhutla.id
        : null;
      item.kondisi_karhutla_id = c[i].kondisi_karhutla
        ? c[i].kondisi_karhutla.id
        : null;
      item.suhu = c[i].suhu;
      item.kelembaban = c[i].suhu;
      item.kecepatan_angin = c[i].kecepatan_angin;
      item.ffmc_kkas_id = c[i].ffmc_kkas ? c[i].ffmc_kkas.id : null;
      item.fwi_id = c[i].fwi ? c[i].fwi.id : null;
      item.dc_kk_id = c[i].dc_kk ? c[i].dc_kk.id : null;
      item.aktivitas_masyarakat = c[i].aktivitas_masyarakat;
      item.keterangan_lokasi_id = c[i].keterangan_lokasi_id;

      for (let j = 0; j < c[i].kondisi_sumber_air.length; j++) {
        let old = c[i].kondisi_sumber_air;
        let air = new kondisiSumberAir();
        air.sumber_air_id = old[j].sumber_air_id;
        air.panjang = old[j].panjang;
        air.lebar = old[j].lebar;
        air.kedalaman = old[j].kedalaman;
        item.kondisi_sumber_air.push(air);
      }

      for (let j = 0; j < c[i].kondisi_vegetasi.length; j++) {
        let old = c[i].kondisi_vegetasi;
        let air = new kondisiVegetasi();
        air.vegetasi_id = old[j].vegetasi_id;
        air.kategori_kondisi_vegetasi_id = old[j].kategori_kondisi_vegetasi_id;
        air.luas_tanah = old[j].luas_tanah;
        item.kondisi_vegetasi.push(air);
      }

      for (let j = 0; j < c[i].kondisi_tanah.length; j++) {
        let old = c[i].kondisi_tanah;
        let air = new kondisiTanah();
        air.tanah_id = old[j].tanah_id;
        air.kedalaman_gambut = old[j].kedalaman_gambut;
        air.luas = old[j].luas;
        item.kondisi_tanah.push(air);
      }

      for (let j = 0; j < c[i].pemadaman.length; j++) {
        let old = c[i].pemadaman;
        let air = new pemadaman();
        air.tipe_kebakaran_id = old[j].tipe_kebakaran_id;
        air.pemilik_lahan_id = old[j].pemilik_lahan_id;
        air.luas_dipadamkan = old[j].luas_dipadamkan;
        air.luas_terbakar = old[j].luas_terbakar;
        air.hasil_pemadaman = old[j].hasil_pemadaman;
        item.pemadaman.push(air);
      }

      this.Patroli.patroli_darat.push(item);
    }

    c = par.patroli_udara;
    for (let i = 0; i < c.length; i++) {
      let item = new PatroliUdara();
      item.desa_kelurahan_id = c[i].desa_kelurahan_id;
      item.cuaca_pagi_id = c[i].cuaca_pagi_id;
      item.cuaca_siang_id = c[i].cuaca_siang_id;
      item.cuaca_sore_id = c[i].cuaca_sore_id;
      item.curah_hujan_id = c[i].curah_hujan_id;
      item.suhu = c[i].suhu;
      item.kelembaban = c[i].kelembaban;
      item.kecepatan_angin = c[i].kecepatan_angin;
      item.ffmc_kkas_id = c[i].ffmc_kkas_id;
      item.fwi_id = c[i].fwi_id;
      item.dc_kk_id = c[i].dc_kk_id;
      item.latitude = c[i].latitude;
      item.longitude = c[i].longitude;
      item.confidence = c[i].confidence;
      item.distance = c[i].distance;
      item.radial = c[i].radial;
      item.kegiatan = c[i].kegiatan;
      item.keterangan = c[i].keterangan;
      this.Patroli.patroli_udara.push(item);
    }
  }

  validasiData(par) {
    if (par.kategori_patroli_id === null || par.kategori_patroli_id === "")
      return "Pilih kategori patroli terlebih dahulu";

    for (let i = 0; i < par.patroli_darat.length; i++) {
      let data = par.patroli_darat[i];
      if (data.desa_kelurahan_id === null || data.desa_kelurahan_id === "")
        return "Pilih desa pada patroli darat " + (i + 1) + " terlebih dahulu";
      else if (data.cuaca_pagi_id === null || data.cuaca_pagi_id === "")
        return (
          "Pilih kategori cuaca pagi pada patroli darat " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (data.cuaca_siang_id === null || data.cuaca_siang_id === "")
        return (
          "Pilih kategori cuaca siang pada patroli darat " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (data.cuaca_sore_id === null || data.cuaca_sore_id === "")
        return (
          "Pilih kategori cuaca sore pada patroli darat " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (
        (data.suhu != null || data.suhu != "") &&
        (data.suhu < 15 || data.suhu > 70)
      )
        return (
          "Data suhu tidak berada antara 15C - 70C pada patroli darat " +
          (i + 1)
        );
      else if (
        (data.kelembaban != null || data.kelembaban != "") &&
        (data.kelembaban < 0 || data.kelembaban > 100)
      )
        return (
          "Data kelembaban tidak berada antara 0% - 100% pada patroli darat " +
          (i + 1)
        );
      else if (
        (data.kecepatan_angin != null || data.kecepatan_angin != "") &&
        data.kecepatan_angin < 0
      )
        return (
          "Data kecepatan angin tidak boleh kurang dari 0 pada patroli darat " +
          (i + 1)
        );

      for (let j = 0; j < data.kondisi_sumber_air.length; j++) {
        let obj = data.kondisi_sumber_air[j];
        if ((obj.panjang != null || obj.panjang != "") && obj.panjang < 0)
          return (
            "Nilai panjang sumber air " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );

        if ((obj.lebar != null || obj.lebar != "") && obj.lebar < 0)
          return (
            "Nilai lebar sumber air " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );

        if ((obj.kedalaman != null || obj.kedalaman != "") && obj.kedalaman < 0)
          return (
            "Nilai kedalaman sumber air " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );
      }

      for (let j = 0; j < data.kondisi_vegetasi.length; j++) {
        let obj = data.kondisi_vegetasi[j];

        if (
          (obj.luas_tanah != null || obj.luas_tanah != "") &&
          obj.luas_tanah < 0
        )
          return (
            "Nilai luas tanah kondisi vegetasi " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );
      }

      for (let j = 0; j < data.kondisi_tanah.length; j++) {
        let obj = data.kondisi_tanah[j];
        if ((obj.luas != null || obj.luas != "") && obj.luas < 0)
          return (
            "Nilai luas tanah kondisi tanah " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );
        if (
          (obj.kedalaman_gambut != null || obj.kedalaman_gambut != "") &&
          obj.kedalaman_gambut < 0
        )
          return (
            "Nilai kedalaman gambut kondisi tanah " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );
      }

      for (let j = 0; j < data.pemadaman.length; j++) {
        let obj = data.pemadaman[j];
        if (
          (obj.luas_dipadamkan != null || obj.luas_dipadamkan != "") &&
          obj.luas_dipadamkan < 0
        )
          return (
            "Nilai luas dipadamkan " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );

        if (
          (obj.luas_terbakar != null || obj.luas_terbakar != "") &&
          obj.luas_terbakar < 0
        )
          return (
            "Nilai luas terbakar " +
            (j + 1) +
            " tidak boleh kurang dari 0 pada patroli darat " +
            (i + 1)
          );
      }
    }

    for (let i = 0; i < par.patroli_udara.length; i++) {
      let data = par.patroli_udara[i];
      if (data.desa_kelurahan_id === null || data.desa_kelurahan_id === "")
        return "Pilih desa pada patroli udara " + (i + 1) + " terlebih dahulu";
      else if (data.cuaca_pagi_id === null || data.cuaca_pagi_id === "")
        return (
          "Pilih kategori cuaca pagi pada patroli udara " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (data.cuaca_siang_id === null || data.cuaca_siang_id === "")
        return (
          "Pilih kategori cuaca siang pada patroli udara " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (data.cuaca_sore_id === null || data.cuaca_sore_id === "")
        return (
          "Pilih kategori cuaca sore pada patroli udara " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (data.curah_hujan_id === null || data.curah_hujan_id === "")
        return (
          "Pilih kategori curah hujan pada patroli udara " +
          (i + 1) +
          " terlebih dahulu"
        );
      else if (
        (data.suhu !== null || data.suhu !== "") &&
        (data.suhu < 15 || data.suhu > 70)
      )
        return (
          "Data suhu tidak berada antara 15C - 70C pada patroli udara " +
          (i + 1)
        );
      else if (
        (data.kelembaban !== null || data.kelembaban !== "") &&
        (data.kelembaban < 0 || data.kelembaban > 100)
      )
        return (
          "Data kelembaban tidak berada antara 0% - 100% pada patroli udara " +
          (i + 1)
        );
      else if (
        (data.confidence != null || data.confidence != "") &&
        (data.confidence < 0 || data.confidence > 100)
      )
        return (
          "Data confidence tidak berada antara 0% - 100% pada patroli udara " +
          (i + 1)
        );
      else if (
        (data.kecepatan_angin != null || data.kecepatan_angin != "") &&
        data.kecepatan_angin < 0
      )
        return (
          "Data kecepatan angin tidak boleh kurang dari 0 pada patroli udara " +
          (i + 1)
        );
      else if (
        (data.distance != null || data.distance != "") &&
        data.distance < 0
      )
        return (
          "Data distance tidak boleh kurang dari 0 pada patroli udara " +
          (i + 1)
        );
      else if ((data.radial != null || data.radial != "") && data.radial < 0)
        return (
          "Data radial tidak boleh kurang dari 0 pada patroli udara " + (i + 1)
        );
    }

    return null;
  }
}
