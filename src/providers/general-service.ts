import { Http, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { ConfigProvider } from "./config";
import "rxjs/add/operator/map";
import { AuthServiceProvider } from "./auth-service";

@Injectable()
export class GeneralServiceProvider {
  KategoriPatroli = [];
  JenisPatroli = [];
  ListDesa = [];
  ListCuaca = [];
  ListCurahHujan = [];
  ListArtifisial = [];
  ListSumberAir = [];
  ListAktivitas = [];
  ListKategoriAnggota = [];
  ListAnggota = [];
  ListTipeKebakaran = [];
  ListPemilikLahan = [];
  ListInventoriPatroli = [];
  ListTanah = [];
  ListVegetasi = [];
  ListSatelit = [];
  KondisiVegetasi = [];
  PotensiKarhutla = [];
  KondisiKarhutla = [];
  KeteranganLokasi = [];
  constructor(
    public http: Http,
    public conf: ConfigProvider,
    public auth: AuthServiceProvider
  ) {
    console.log("Hello GeneralServiceProvider Provider");
    this.JenisPatroli = ["DARAT", "UDARA"];
  }

  getListCurahHujan() {
    var url = this.conf.baseUrl + "/api/curah-hujan/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.ListCurahHujan = data.data;
        },
        err => console.log(err)
      );
  }
  getListCuaca() {
    var url = this.conf.baseUrl + "/api/cuaca/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.ListCuaca = data.data;
        },
        err => console.log(err)
      );
  }
  getListArtifisial() {
    var url = this.conf.baseUrl + "/api/artifisial-param/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.ListArtifisial = data.data;
        },
        err => console.log(err)
      );
  }
  getListSumberAir() {
    var url = this.conf.baseUrl + "/api/sumber-air/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.ListSumberAir = data.data;
        },
        err => console.log(err)
      );
  }
  getListAktivitasHarian() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/aktivitas-harian/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListAktivitas = data.data.map(item => {
            return { aktivitas_harian_id: item.id, nama: item.nama };
          });
          console.log(this.ListAktivitas);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListTipeKebakaran() {
    var url = this.conf.baseUrl + "/api/tipe-kebakaran/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListTipeKebakaran = data.data;
          console.log(this.ListTipeKebakaran);
        },
        err => {
          console.log(err);
        }
      );
  }
  getListPemilikLahan() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/pemilik-lahan/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListPemilikLahan = data.data;
          console.log(this.ListPemilikLahan);
        },
        err => {
          console.log(err);
        }
      );
  }
  getListInventori() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/inventori-patroli/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListInventoriPatroli = data.data.map(item => {
            return { inventori_id: item.id, nama: item.nama, jumlah_unit: 0 };
          });
          console.log(this.ListInventoriPatroli);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListTanah() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/tanah/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListTanah = data.data;
          console.log(this.ListTanah);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListVegetasi() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/vegetasi/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListVegetasi = data.data;
          console.log(this.ListVegetasi);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListSatelit() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/satelit/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListSatelit = data.data.map(item => {
            return { satelit_id: item.id, deskripsi: "", ...item };
          });
          console.log(this.ListSatelit);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListKondisiVegetasi() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/kategori-kondisi-vegetasi/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.KondisiVegetasi = data.data;
          console.log(this.KondisiVegetasi);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListPotensiKarhutla() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/potensi-karhutla/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.PotensiKarhutla = data.data;
          console.log(this.PotensiKarhutla);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListKondisiKarhutla() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/kondisi-karhutla/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.KondisiKarhutla = data.data;
          console.log(this.KondisiKarhutla);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListKategoriPatroli() {
    var url = this.conf.baseUrl + "/api/kategori-patroli/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.KategoriPatroli = data.data;
        },
        err => console.log(err)
      );
  }
  getListKeternganLokasi() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/keterangan-lokasi/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.KeteranganLokasi = data.data;
          console.log(this.KeteranganLokasi);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }

  getListDesa() {
    var url = this.conf.baseUrl + "/api/desakelurahan/list";
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data.data);
          this.ListDesa = data.data;
        },
        err => console.log(err)
      );
  }
  getListKategoriAnggota() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/kategori-anggota/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListKategoriAnggota = data.data;
          console.log(this.ListKategoriAnggota);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getListAnggota() {
    var headers = new Headers();
    let token = this.auth.AuthToken;
    headers.append("Authorization", "Bearer " + token);
    var url = this.conf.baseUrl + "/api/anggota/list";
    return this.http
      .get(url, { headers: headers })
      .map(res => res.json())
      .subscribe(
        data => {
          this.ListAnggota = data.data.map(item => {
            return { anggota_id: item.id, ...item };
          });
          console.log(this.ListAnggota);
        },
        err => {
          console.log(err);
          if (err.status == 401)
            this.conf.showAllert("Failed", "Token Expired. Please log out.");
          else if (err.status == 0)
            this.conf.showAllert("Failed", "Connection Problem");
          else this.conf.showAllert("Failed", "Internal Server Error");
        }
      );
  }
  getAllData() {
    if (this.KategoriPatroli.length == 0) this.getListKategoriPatroli();
    if (this.ListDesa.length == 0) this.getListDesa();
    if (this.ListCuaca.length == 0) this.getListCuaca();
    if (this.ListCurahHujan.length == 0) this.getListCurahHujan();
    if (this.ListArtifisial.length == 0) this.getListArtifisial();
    if (this.ListSumberAir.length == 0) this.getListSumberAir();
    if (this.ListAktivitas.length == 0) this.getListAktivitasHarian();
    if (this.ListKategoriAnggota.length == 0) this.getListKategoriAnggota();
    if (this.ListAnggota.length == 0) this.getListAnggota();
    if (this.ListTipeKebakaran.length == 0) this.getListTipeKebakaran();
    if (this.ListPemilikLahan.length == 0) this.getListPemilikLahan();
    if (this.ListInventoriPatroli.length == 0) this.getListInventori();
    if (this.ListTanah.length == 0) this.getListTanah();
    if (this.ListVegetasi.length == 0) this.getListVegetasi();
    if (this.ListSatelit.length == 0) this.getListSatelit();
    if (this.KondisiVegetasi.length == 0) this.getListKondisiVegetasi();
    if (this.PotensiKarhutla.length == 0) this.getListPotensiKarhutla();
    if (this.KondisiKarhutla.length == 0) this.getListKondisiKarhutla();
    if (this.KeteranganLokasi.length == 0) this.getListKeternganLokasi();
  }

  checkToken(): Promise<any> {
    return new Promise(resolve => {
      var headers = new Headers();
      let token = this.auth.AuthToken;
      headers.append("Authorization", "Bearer " + token);
      var url = this.conf.baseUrl + "/api/kategori-anggota/list";
      this.http
        .get(url, { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data);
            resolve(data);
          },
          err => {
            console.log(err);
            resolve(err);
          }
        );
    });
  }
}
