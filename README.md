```markdown
# Dokumentasi Penggunaan Modul GameKU

Halo, selamat datang di dokumentasi penggunaan modul GameKU. Modul ini adalah sebuah permainan teka-teki kata yang seru dan menantang. Berikut adalah panduan lengkap untuk menggunakan modul ini.

## Persiapan Awal

Sebelum memulai, pastikan Anda telah menginstal modul ini dengan menggunakan perintah berikut di terminal Anda:

```bash
npm install github:Rikikangsc2/GameKU
```

Setelah berhasil menginstal, Anda dapat memulai permainan dengan mengimpor modul ini ke dalam kode program Anda:

```javascript
const gameku = require('GameKU');
```

## Fungsi yang Tersedia

Modul ini menyediakan beberapa fungsi yang dapat Anda gunakan untuk bermain teka-teki kata. Berikut adalah daftar fungsi tersebut:

### 1. `getSoal(username)`

Fungsi ini digunakan untuk mendapatkan soal baru. Anda hanya perlu memberikan username sebagai parameter. Contoh penggunaannya:

```javascript
gameku.getSoal('Riki');
```

### 2. `jawabSoal(username, jawaban)`

Fungsi ini digunakan untuk menjawab soal yang telah diberikan. Anda perlu memberikan username dan jawaban Anda sebagai parameter. Contoh penggunaannya:

```javascript
gameku.jawabSoal('Riki', 'Jawaban Anda');
```

### 3. `skor(username)`

Fungsi ini digunakan untuk melihat skor Anda saat ini. Anda hanya perlu memberikan username sebagai parameter. Contoh penggunaannya:

```javascript
gameku.skor('Riki');
```

### 4. `topskor()`

Fungsi ini digunakan untuk melihat 10 skor tertinggi dari semua pemain. Fungsi ini tidak memerlukan parameter. Contoh penggunaannya:

```javascript
gameku.topskor();
```

### 5. `nyerah(username)`

Fungsi ini digunakan jika Anda ingin menyerah dan menghapus soal yang sedang dihadapi. Anda hanya perlu memberikan username sebagai parameter. Contoh penggunaannya:

```javascript
gameku.nyerah('Riki');
```

## Kesimpulan

Itulah cara menggunakan modul GameKU. Dengan modul ini, Anda dapat bermain teka-teki kata kapan saja dan di mana saja. Selamat bermain dan semoga berhasil mendapatkan skor tertinggi!
```
