export class PatroliDarat {
  // Data general
  tanggal_patroli = '2018-04-06';
  kategori_patroli_id;
  jenis_patroli;
  desa_kelurahan_id;
  cuaca_pagi_id;
  cuaca_siang_id;
  cuaca_sore_id;
  curah_hujan_id;
  suhu;
  kelembapan;
  kecepatan_angin;
  ffmc_kkas_id;
  fwi_id;
  dc_kk_id;
  inventori_patroli = [];
  hotspot = [];
  aktivitas_harian_patroli = [];
  anggota_patroli = [];
  // Data spesifik patroli darat
  aktivitas_masyarakat = ' membersihkan lahan dan bercocok tanam';
  keterangan_lokasi = 'akses yg bisa digunakan hanya jalan setapak';
  hasil_uji = [];
  kondisi_sumber_air = [];
  kondisi_vegetasi = [];
  kondisi_tanah = [];
  pemadaman = [];
  constructor() {
  }
}

export class inventoriPatroli {
  inventori_id = null;
  constructor() {
  }
}

export class hotspot {
  satelit_id
  deskripsi
  constructor() {
  }
}

export class aktivitasHarianPatroli {
  aktivitas_harian_id
  constructor() {
  }
}

export class anggotaPatroli {
  anggota_id
  constructor() {
  }
}
export class hasilUji {
  nama_pengujian = 'Uji Remas Daun';
  hasil = 'Daun agak kering';
  constructor() {
  }
}

export class kondisiSumberAir {
  sumber_air_id = 1;
  longitude = -1.963555556;
  latitude = 110.1340833;
  panjang = 2;
  lebar = 2;
  kedalaman = 1.5;
  constructor() {
  }
}


export class kondisiVegetasi {
  longitude = -1.963555556;
  latitude = 110.1340833;
  vegetasi_id = 1;
  kategori_kondisi_vegetasi_id = 1;
  potensi_karhutla_id = 1;
  kondisi_karhutla_id = 1;
  luas_tanah = 3;
  constructor() {
  }
}

export class kondisiTanah {
  longitude = -1.963555556;
  latitude = 110.1340833;
  tanah_id = 1;
  potensi_karhutla_id = 1;
  kondisi_karhutla_id = 1;
  kedalaman_gambut = 1.5
  constructor() {
  }
}

export class pemadaman {
  longitude = -1.963555556;
  latitude = 110.1340833;
  luas_terbakar = 1;
  constructor() {
  }
}

