## Persiapan Awal
```bash
npm install github:Rikikangsc2/GameKU
```
```javascript
const gameku = require('GameKU');
```

## Fungsi yang Tersedia
### 1. `susunKata(username)`

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