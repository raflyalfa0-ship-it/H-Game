# Anime Sheet Studio

Generator character sheet anime 2D berbasis HTML, CSS, dan JavaScript murni. Tidak memerlukan Node.js, framework, atau API.

## Fitur

- Membuat karakter konsep baru dengan nama, warna rambut, mata, kulit, dan detail acak.
- Pilihan gaya: School Fantasy, Urban Streetwear, Fantasy Adventurer, dan Sci-fi Academy.
- Pilihan ekspresi dan palet warna.
- Pratinjau character sheet vektor SVG.
- Ekspor character sheet ke PNG.
- Responsif untuk desktop dan perangkat seluler.
- Siap dipublikasikan dengan GitHub Pages.

> Catatan: ilustrasi karakter dirender dari SVG yang dibuat oleh kode, bukan gambar AI atau aset gambar eksternal. Thumbnail ekspresi adalah ilustrasi konseptual sederhana.

## Menjalankan secara lokal

1. Unduh atau clone repository ini.
2. Buka `index.html` di browser modern.
3. Klik **Acak karakter** atau ubah pilihan pada panel pengaturan.
4. Klik **Ekspor PNG** untuk menyimpan hasil.

Tidak perlu instalasi dependensi.

## Publikasi ke GitHub Pages

1. Buat repository baru di GitHub.
2. Unggah `index.html`, `styles.css`, `app.js`, `README.md`, dan `.gitignore`.
3. Buka **Settings → Pages** pada repository.
4. Pada bagian build/deployment, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu simpan.
6. Tunggu proses deploy selesai; URL situs akan muncul di halaman Pages.

## Struktur proyek

```text
anime-character-sheet-generator/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .gitignore
```

## Kustomisasi

- Nama karakter dan opsi acak: `app.js`, bagian `namesA`, `namesB`, `hairColors`, `skinColors`, dan `eyeColors`.
- Palet warna: objek `palettes` di `app.js`.
- Gaya pakaian: fungsi `outfitFor()` di `app.js`.
- Tampilan antarmuka: `styles.css`.
- Konten halaman: `index.html`.

## Lisensi

Tambahkan lisensi pilihan Anda sebelum mendistribusikan ulang. Jika ingin memakai aset atau font pihak ketiga, pastikan lisensinya mengizinkan penggunaan tersebut.
