export class DataPatroli {
  tanggal_patroli = null;
  kategori_patroli_id = null;
  inventori_patroli = [];
  hotspot = [];
  aktivitas_harian_patroli = [];
  anggota_patroli = [];
  images = [];
  patroli_darat = [];
  patroli_udara = [];
}
export class PatroliUdara {
  desa_kelurahan_id = null;
  cuaca_pagi_id = null;
  cuaca_siang_id = null;
  cuaca_sore_id = null;
  curah_hujan_id = null;
  suhu = null;
  kelembaban = null;
  kecepatan_angin = null;
  ffmc_kkas_id = null;
  fwi_id = null;
  dc_kk_id = null;
  latitude = null;
  longitude = null;
  confidence = null;
  distance = null;
  radial = null;
  kegiatan = null;
  keterangan = null;
  constructor() {}
}
export class PatroliDarat {
  latitude = null;
  longitude = null;
  desa_kelurahan_id = null;
  cuaca_pagi_id = null;
  cuaca_siang_id = null;
  cuaca_sore_id = null;
  curah_hujan_id = null;
  potensi_karhutla_id = null;
  kondisi_karhutla_id = null;
  suhu = null;
  kelembaban = null;
  kecepatan_angin = null;
  ffmc_kkas_id = null;
  fwi_id = null;
  dc_kk_id = null;
  aktivitas_masyarakat = null;
  keterangan_lokasi_id = null;
  hasil_uji = [];
  kondisi_sumber_air = [];
  kondisi_vegetasi = [];
  kondisi_tanah = [];
  pemadaman = [];
  constructor() {}
}
export class inventoriPatroli {
  inventori_id = null;
  jumlah_unit = null;
  constructor() {}
}

export class hotspot {
  satelit_id = null;
  deskripsi = "Nihil";
  constructor() {}
}

export class aktivitasHarianPatroli {
  aktivitas_harian_id = null;
  constructor() {}
}
export class anggotaPatroli {
  anggota_id: null;
  constructor() {}
}
export class hasilUji {
  nama_pengujian = "";
  hasil = "";
  constructor() {}
}
export class kondisiSumberAir {
  sumber_air_id = null;
  longitude = null;
  latitude = null;
  panjang = null;
  lebar = null;
  kedalaman = null;
  constructor() {}
}

export class kondisiVegetasi {
  longitude = null;
  latitude = null;
  vegetasi_id = null;
  kategori_kondisi_vegetasi_id = null;
  luas_tanah = null;
  constructor() {}
}

export class kondisiTanah {
  longitude = null;
  latitude = null;
  tanah_id = null;
  kedalaman_gambut = null;
  luas = null;
  constructor() {}
}

export class pemadaman {
  longitude = null;
  latitude = null;
  luas_terbakar = null;
  luas_dipadamkan = null;
  hasil_pemadaman = null;
  tipe_kebakaran_id = null;
  pemilik_lahan_id = null;
  constructor() {}
}
