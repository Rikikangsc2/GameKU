const fs = require('fs');
const axios = require('axios');

// Membuat file jika belum ada
const initializeFiles = () => {
  if (!fs.existsSync('soal.json')) fs.writeFileSync('soal.json', '{}');
  if (!fs.existsSync('nyerah.json')) fs.writeFileSync('nyerah.json', '{}');
  if (!fs.existsSync('point.json')) fs.writeFileSync('point.json', '{}');
};

// Fungsi untuk mendapatkan soal
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

// Fungsi untuk menjawab soal
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

// Fungsi untuk melihat skor
const skor = (username) => {
  const pointData = JSON.parse(fs.readFileSync('point.json'));
  return `point ${username} adalah ${pointData[username] || 0}`;
};

// Fungsi untuk melihat top skor
const topskor = () => {
  const pointData = JSON.parse(fs.readFileSync('point.json'));
  const sortedUsers = Object.keys(pointData).sort((a, b) => pointData[b] - pointData[a]).slice(0, 10);
  return `*Berikut 10 user dengan point tertinggi :*\n${sortedUsers.map((user, index) => `${index + 1}. ${user} - ${pointData[user]}`).join('\n')}`;
};

// Fungsi untuk menyerah
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

// Inisialisasi file
initializeFiles();

module.exports = { getSoal, jawabSoal, skor, topskor, nyerah };
