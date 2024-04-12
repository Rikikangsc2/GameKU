# Dokumentasi Kode: Game Susun Kata

Berikut ini adalah dokumentasi untuk kode game susun kata yang Anda berikan. Kode ini menggunakan Node.js dan modul `fs` untuk operasi file serta `axios` untuk melakukan request HTTP.

## Inisialisasi File

```javascript
const fs = require('fs');
const axios = require('axios');

const initializeFiles = () => {
  if (!fs.existsSync('soal.json')) fs.writeFileSync('soal.json', '{}');
  if (!fs.existsSync('nyerah.json')) fs.writeFileSync('nyerah.json', '{}');
  if (!fs.existsSync('point.json')) fs.writeFileSync('point.json', '{}');
};

initializeFiles();
```

Fungsi `initializeFiles` digunakan untuk membuat file `soal.json`, `nyerah.json`, dan `point.json` jika file tersebut belum ada. Fungsi ini dipanggil saat kode dijalankan.

## Mendapatkan Soal

```javascript
const getSoal = async (username) => {
  const nyerahData = JSON.parse(fs.readFileSync('nyerah.json'));
  const soalData = JSON.parse(fs.readFileSync('soal.json'));

  if (nyerahData[username]) {
    delete nyerahData[username];
    fs.writeFileSync('nyerah.json', JSON.stringify(nyerahData));
  }

  if (!soalData[username]) {
    const response = await axios.get('https://raw.githubusercontent.com/ramadhankukuh/database/master/src/games/susunkata.json');
    const soal = response.data[Math.floor(Math.random() * response.data.length)];
    soalData[username] = soal;
    fs.writeFileSync('soal.json', JSON.stringify(soalData));
    return `Jawab soal berikut:\n*soal :* ${soal.soal}\n*tipe :* ${soal.tipe}`;
  } else {
    const soal = soalData[username];
    return `${username} kamu belum menjawab soal ini :\n*soal :* ${soal.soal}\n*tipe :* ${soal.tipe}`;
  }
};
```

Fungsi `getSoal` digunakan untuk mendapatkan soal untuk pengguna. Jika pengguna telah menyerah pada soal sebelumnya, maka soal tersebut akan dihapus. Jika pengguna belum memiliki soal, maka akan diambil soal baru dari database dan disimpan dalam `soal.json`. Jika pengguna sudah memiliki soal yang belum dijawab, maka soal tersebut akan dikembalikan.

## Menjawab Soal

```javascript
const jawabSoal = (username, jawaban) => {
  const soalData = JSON.parse(fs.readFileSync('soal.json'));
  const pointData = JSON.parse(fs.readFileSync('point.json'));

  if (!soalData[username]) {
    return `Sepertinya ${username} belum mengambil soal`;
  }

  const soal = soalData[username];
  if (jawaban.toUpperCase() === soal.jawaban) {
    pointData[username] = (pointData[username] || 0) + 3;
    delete soalData[username];
    fs.writeFileSync('soal.json', JSON.stringify(soalData));
    fs.writeFileSync('point.json', JSON.stringify(pointData));
    return `*Benar* Kamu mendapatkan 3 point`;
  } else {
    if (pointData[username] > 0) {
      pointData[username] -= 1;
    }
    fs.writeFileSync('point.json', JSON.stringify(pointData));
    return `*Salah* Point kamu di kurangi 1`;
  }
};
```

Fungsi `jawabSoal` digunakan untuk memeriksa jawaban pengguna. Jika jawaban benar, maka pengguna mendapatkan 3 poin dan soal dihapus. Jika jawaban salah, maka poin pengguna dikurangi 1.

## Melihat Skor

```javascript
const skor = (username) => {
  const pointData = JSON.parse(fs.readFileSync('point.json'));
  return `point ${username} adalah ${pointData[username] || 0}`;
};
```

Fungsi `skor` digunakan untuk melihat skor pengguna. Skor pengguna diambil dari file `point.json`.

## Melihat Top Skor

```javascript
const topskor = () => {
  const pointData = JSON.parse(fs.readFileSync('point.json'));
  const sortedUsers = Object.keys(pointData).sort((a, b) => pointData[b] - pointData[a]).slice(0, 10);
  return `*Berikut 10 user dengan point tertinggi :*\n${sortedUsers.map((user, index) => `${index + 1}. ${user} - ${pointData[user]}`).join('\n')}`;
};
```

Fungsi `topskor` digunakan untuk melihat 10 pengguna dengan skor tertinggi. Skor pengguna diambil dari file `point.json` dan diurutkan dari yang tertinggi.

## Menyerah

```javascript
const nyerah = (username) => {
  const soalData = JSON.parse(fs.readFileSync('soal.json'));
  if (soalData[username]) {
    delete soalData[username];
    fs.writeFileSync('soal.json', JSON.stringify(soalData));
    return `*Baik* soal ${username} di hapus`;
  } else {
    return `${username} belum ngambil soal udah nyerah hadeh`;
  }
};
```

Fungsi `nyerah` digunakan untuk menghapus soal pengguna jika pengguna menyerah. Soal pengguna dihapus dari file `soal.json`.

Semoga dokumentasi ini membantu Anda memahami struktur dan cara kerja kode ini. Jika ada pertanyaan lebih lanjut, jangan ragu untuk bertanya.
