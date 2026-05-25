export interface IQQuestion {
  id: number;
  category: "logical" | "spatial" | "verbal" | "numerical";
  q: { id: string; en: string };
  options: {
    id: string;
    text: { id: string; en: string };
    isCorrect: boolean;
  }[];
}

// Exactly 50 professional, elegant IQ questions
export const iqQuestions: IQQuestion[] = [
  {
    id: 1,
    category: "logical",
    q: {
      id: "Manakah kelanjutan dari pola ini: O, T, T, F, F, S, S, ...?",
      en: "Which letter should come next in the sequence: O, T, T, F, F, S, S, ...?"
    },
    options: [
      { id: "a", text: { id: "E", en: "E" }, isCorrect: true }, // One, Two, Three, Four, Five, Six, Seven, Eight -> E
      { id: "b", text: { id: "N", en: "N" }, isCorrect: false },
      { id: "c", text: { id: "T", en: "T" }, isCorrect: false },
      { id: "d", text: { id: "O", en: "O" }, isCorrect: false }
    ]
  },
  {
    id: 2,
    category: "numerical",
    q: {
      id: "Lengkapi seri angka berikut: 2, 4, 8, 16, 32, ...?",
      en: "Complete the numerical sequence: 2, 4, 8, 16, 32, ...?"
    },
    options: [
      { id: "a", text: { id: "48", en: "48" }, isCorrect: false },
      { id: "b", text: { id: "64", en: "64" }, isCorrect: true },
      { id: "c", text: { id: "50", en: "50" }, isCorrect: false },
      { id: "d", text: { id: "128", en: "128" }, isCorrect: false }
    ]
  },
  {
    id: 3,
    category: "logical",
    q: {
      id: "Jika semua mawar adalah bunga, dan semua bunga adalah tanaman, maka...",
      en: "If all roses are flowers, and all flowers are plants, then..."
    },
    options: [
      { id: "a", text: { id: "Beberapa tanaman adalah mawar", en: "Some plants are roses" }, isCorrect: true },
      { id: "b", text: { id: "Semua tanaman adalah mawar", en: "All plants are roses" }, isCorrect: false },
      { id: "c", text: { id: "Mawar bukan merupakan tanaman", en: "Roses are not plants" }, isCorrect: false },
      { id: "d", text: { id: "Semua bunga berwarna merah", en: "All flowers are red" }, isCorrect: false }
    ]
  },
  {
    id: 4,
    category: "spatial",
    q: {
      id: "Sebuah kubus memiliki 6 sisi. Jika dipotong mendatar tepat di tengah, berapa total sisi dari kedua belahan sekarang?",
      en: "A cube has 6 faces. If cut horizontally exactly in the middle, what is the total number of faces of both pieces combined?"
    },
    options: [
      { id: "a", text: { id: "12 sisi", en: "12 faces" }, isCorrect: true }, // After slicing, each piece has 6 faces (original 5 + 1 new face) -> 12 faces
      { id: "b", text: { id: "8 sisi", en: "8 faces" }, isCorrect: false },
      { id: "c", text: { id: "10 sisi", en: "10 faces" }, isCorrect: false },
      { id: "d", text: { id: "14 sisi", en: "14 faces" }, isCorrect: false }
    ]
  },
  {
    id: 5,
    category: "verbal",
    q: {
      id: "Manakah kata yang TIDAK cocok dengan gerombolan ini: Apel, Mangga, Kentang, Pisang?",
      en: "Which word does NOT belong in this group: Apple, Mango, Potato, Banana?"
    },
    options: [
      { id: "a", text: { id: "Apel", en: "Apple" }, isCorrect: false },
      { id: "b", text: { id: "Kentang (Sayur umbi, bukan buah)", en: "Potato (Tuber, not a fruit)" }, isCorrect: true },
      { id: "c", text: { id: "Mangga", en: "Mango" }, isCorrect: false },
      { id: "d", text: { id: "Pisang", en: "Banana" }, isCorrect: false }
    ]
  },
  {
    id: 6,
    category: "numerical",
    q: {
      id: "Seri angka: 121, 144, 169, 196, ... Berapa angka berikutnya?",
      en: "Number series: 121, 144, 169, 196, ... What is the next number?"
    },
    options: [
      { id: "a", text: { id: "225 (15 kuadrat)", en: "225 (15 squared)" }, isCorrect: true },
      { id: "b", text: { id: "256", en: "256" }, isCorrect: false },
      { id: "c", text: { id: "210", en: "210" }, isCorrect: false },
      { id: "d", text: { id: "240", en: "240" }, isCorrect: false }
    ]
  },
  {
    id: 7,
    category: "logical",
    q: {
      id: "Jika hari esok adalah hari Jumat, kemarin lusa adalah hari...",
      en: "If tomorrow is Friday, the day before yesterday was..."
    },
    options: [
      { id: "a", text: { id: "Selasa (Hari ini Kamis, lusa Sabtu, kemarin Rabu, kemarin lusa Selasa)", en: "Tuesday" }, isCorrect: true },
      { id: "b", text: { id: "Senin", en: "Monday" }, isCorrect: false },
      { id: "c", text: { id: "Rabu", en: "Wednesday" }, isCorrect: false },
      { id: "d", text: { id: "Minggu", en: "Sunday" }, isCorrect: false }
    ]
  },
  {
    id: 8,
    category: "spatial",
    q: {
      id: "Jika Anda memutar peta searah jarum jam sebesar 270 derajat, ke arah mana penunjuk 'Selatan' sekarang menunjuk?",
      en: "If you rotate a map clockwise by 270 degrees, which direction is the 'South' arrow pointing now?"
    },
    options: [
      { id: "a", text: { id: "Timur (Mula-mula bawah, diputar 90 -> Barat, 180 -> Utara, 270 -> Timur)", en: "East" }, isCorrect: true },
      { id: "b", text: { id: "Barat", en: "West" }, isCorrect: false },
      { id: "c", text: { id: "Utara", en: "North" }, isCorrect: false },
      { id: "d", text: { id: "Selatan", en: "South" }, isCorrect: false }
    ]
  },
  {
    id: 9,
    category: "verbal",
    q: {
      id: "Buku berhubungan dengan Membaca sebagaimana Film berhubungan dengan...",
      en: "Book is to Reading as Movie is to..."
    },
    options: [
      { id: "a", text: { id: "Menonton", en: "Watching" }, isCorrect: true },
      { id: "b", text: { id: "Mendengar", en: "Listening" }, isCorrect: false },
      { id: "c", text: { id: "Sutradara", en: "Directing" }, isCorrect: false },
      { id: "d", text: { id: "Teater", en: "Theater" }, isCorrect: false }
    ]
  },
  {
    id: 10,
    category: "numerical",
    q: {
      id: "Hasil dari (15 x 4) - (36 / 3) + 7 adalah...",
      en: "The result of (15 x 4) - (36 / 3) + 7 is..."
    },
    options: [
      { id: "a", text: { id: "55 (60 - 12 + 7 = 55)", en: "55" }, isCorrect: true },
      { id: "b", text: { id: "45", en: "45" }, isCorrect: false },
      { id: "c", text: { id: "65", en: "65" }, isCorrect: false },
      { id: "d", text: { id: "51", en: "51" }, isCorrect: false }
    ]
  },
  {
    id: 11,
    category: "logical",
    q: {
      id: "Semua komputer adalah mesin elektronik. Sebagian ponsel memiliki kekuatan prosesor seperti komputer. Jadi...",
      en: "All computers are electronic machines. Some mobile phones have processor power like computers. Thus..."
    },
    options: [
      { id: "a", text: { id: "Sebagian ponsel adalah mesin elektronik", en: "Some mobile phones are electronic machines" }, isCorrect: true },
      { id: "b", text: { id: "Semua ponsel adalah mesin elektronik", en: "All mobile phones are electronic machines" }, isCorrect: false },
      { id: "c", text: { id: "Tidak ada ponsel yang merupakan mesin elektronik", en: "No mobile phone is an electronic machine" }, isCorrect: false },
      { id: "d", text: { id: "Komputer digantikan ponsel sepenuhnya", en: "Computers are completely replaced by phones" }, isCorrect: false }
    ]
  },
  {
    id: 12,
    category: "numerical",
    q: {
      id: "Lengkapi deret berikut: 1, 3, 6, 10, 15, ...?",
      en: "Complete the series: 1, 3, 6, 10, 15, ...?"
    },
    options: [
      { id: "a", text: { id: "21 (+2, +3, +4, +5, +6)", en: "21" }, isCorrect: true },
      { id: "b", text: { id: "20", en: "20" }, isCorrect: false },
      { id: "c", text: { id: "23", en: "23" }, isCorrect: false },
      { id: "d", text: { id: "25", en: "25" }, isCorrect: false }
    ]
  },
  {
    id: 13,
    category: "spatial",
    q: {
      id: "Sebuah dadu standar memiliki pola titik 1 berlawanan dengan 6, 2 dengan 5, dan 3 dengan 4. Jika Anda melihat sisi atas dadu adalah 4 dan sisi depan adalah 2, angka berapa yang ada di sisi bawah?",
      en: "A standard die has points 1 opposite to 6, 2 to 5, and 3 to 4. If you see the top face is 4 and the front face is 2, what face is at the bottom?"
    },
    options: [
      { id: "a", text: { id: "3 (Berlawanan dengan 4)", en: "3" }, isCorrect: true },
      { id: "b", text: { id: "5", en: "5" }, isCorrect: false },
      { id: "c", text: { id: "1", en: "1" }, isCorrect: false },
      { id: "d", text: { id: "6", en: "6" }, isCorrect: false }
    ]
  },
  {
    id: 14,
    category: "verbal",
    q: {
      id: "Manakah antonim dari kata 'EGOIS'?",
      en: "What is the antonym of the word 'SELFISH'?"
    },
    options: [
      { id: "a", text: { id: "Altruis / Dermawan", en: "Altruistic / Generous" }, isCorrect: true },
      { id: "b", text: { id: "Apatis", en: "Apathetic" }, isCorrect: false },
      { id: "c", text: { id: "Ambisius", en: "Ambitious" }, isCorrect: false },
      { id: "d", text: { id: "EgoSentrasi", en: "Egocentrist" }, isCorrect: false }
    ]
  },
  {
    id: 15,
    category: "numerical",
    q: {
      id: "Jika 5 orang pekerja dapat menyelesaikan proyek dalam 12 hari, berapa hari yang dibutuhkan 10 orang pekerja?",
      en: "If 5 workers can complete a project in 12 days, how many days are needed for 10 workers?"
    },
    options: [
      { id: "a", text: { id: "6 hari", en: "6 days" }, isCorrect: true },
      { id: "b", text: { id: "24 hari", en: "24 days" }, isCorrect: false },
      { id: "c", text: { id: "4 hari", en: "4 days" }, isCorrect: false },
      { id: "d", text: { id: "8 hari", en: "8 days" }, isCorrect: false }
    ]
  },
  {
    id: 16,
    category: "logical",
    q: {
      id: "Kelanjutan pola: ABC, EFG, IJK, ...?",
      en: "Next in the sequence: ABC, EFG, IJK, ...?"
    },
    options: [
      { id: "a", text: { id: "MNO (Melewati D, H, L)", en: "MNO (Skips D, H, L)" }, isCorrect: true },
      { id: "b", text: { id: "LMN", en: "LMN" }, isCorrect: false },
      { id: "c", text: { id: "OPQ", en: "OPQ" }, isCorrect: false },
      { id: "d", text: { id: "NOP", en: "NOP" }, isCorrect: false }
    ]
  },
  {
    id: 17,
    category: "spatial",
    q: {
      id: "Sebuah kertas persegi panjang dilipat menjadi dua secara horizontal, lalu dilipat menjadi dua lagi secara vertikal, lalu dilubangi di tengahnya. Berapa banyak lubang yang terbentuk saat lipatan dibuka?",
      en: "A rectangular paper is folded in half horizontally, then in half again vertically, and then a hole is punched through the center. How many holes are there when the paper is unfolded?"
    },
    options: [
      { id: "a", text: { id: "4 lubang", en: "4 holes" }, isCorrect: true },
      { id: "b", text: { id: "2 lubang", en: "2 holes" }, isCorrect: false },
      { id: "c", text: { id: "1 lubang", en: "1 hole" }, isCorrect: false },
      { id: "d", text: { id: "8 lubang", en: "8 holes" }, isCorrect: false }
    ]
  },
  {
    id: 18,
    category: "verbal",
    q: {
      id: "Udara berhubungan dengan Paru-paru sebagaimana Karbondioksida berhubungan dengan...",
      en: "Air is to Lungs as Carbon Dioxide is to..."
    },
    options: [
      { id: "a", text: { id: "Daun / Fotosintesis", en: "Leaf / Photosynthesis" }, isCorrect: true },
      { id: "b", text: { id: "Oksigen", en: "Oxygen" }, isCorrect: false },
      { id: "c", text: { id: "Manusia", en: "Human" }, isCorrect: false },
      { id: "d", text: { id: "Tanah", en: "Soil" }, isCorrect: false }
    ]
  },
  {
    id: 19,
    category: "numerical",
    q: {
      id: "Berapa hasil dari 3/4 dari 240?",
      en: "What is 3/4 of 240?"
    },
    options: [
      { id: "a", text: { id: "180", en: "180" }, isCorrect: true },
      { id: "b", text: { id: "160", en: "160" }, isCorrect: false },
      { id: "c", text: { id: "200", en: "200" }, isCorrect: false },
      { id: "d", text: { id: "120", en: "120" }, isCorrect: false }
    ]
  },
  {
    id: 20,
    category: "logical",
    q: {
      id: "Semua siswa menyukai liburan. Sebagian orang yang menyukai liburan gemar bermain selancar. Maka...",
      en: "All students love vacation. Some people who love vacation like to surf. Therefore..."
    },
    options: [
      { id: "a", text: { id: "Sebagian siswa mungkin gemar selancar", en: "Some students might support/enjoy surfing" }, isCorrect: true },
      { id: "b", text: { id: "Semua siswa pasti pintar berselancar", en: "All students are absolutely expert surfers" }, isCorrect: false },
      { id: "c", text: { id: "Orang yang tidak suka liburan gemar selancar", en: "People who don't like vacation love surfing" }, isCorrect: false },
      { id: "d", text: { id: "Siswa membenci selancar", en: "Students hate surfing" }, isCorrect: false }
    ]
  },
  {
    id: 21,
    category: "numerical",
    q: {
      id: "Deret angka: 8, 12, 18, 26, ... Berapa angka lanjutan berikutnya?",
      en: "Number series: 8, 12, 18, 26, ... What is the next number?"
    },
    options: [
      { id: "a", text: { id: "36 (+4, +6, +8, +10)", en: "36" }, isCorrect: true },
      { id: "b", text: { id: "34", en: "34" }, isCorrect: false },
      { id: "c", text: { id: "40", en: "40" }, isCorrect: false },
      { id: "d", text: { id: "38", en: "38" }, isCorrect: false }
    ]
  },
  {
    id: 22,
    category: "spatial",
    q: {
      id: "Jika jam dinding saat ini menunjuk pukul 09:00, berapa derajat sudut terkecil yang terbentuk antara jarum panjang dan pendek?",
      en: "If the wall clock reads 09:00, what is the smallest angle in degrees between the hour hand and minute hand?"
    },
    options: [
      { id: "a", text: { id: "90 derajat", en: "90 degrees" }, isCorrect: true },
      { id: "b", text: { id: "270 derajat", en: "270 degrees" }, isCorrect: false },
      { id: "c", text: { id: "120 derajat", en: "120 degrees" }, isCorrect: false },
      { id: "d", text: { id: "180 derajat", en: "180 degrees" }, isCorrect: false }
    ]
  },
  {
    id: 23,
    category: "verbal",
    q: {
      id: "Manakah dari kata ini yang memiliki arti paling dekat dengan kata 'OPTIMAL'?",
      en: "Which word has the closest meaning to the word 'OPTIMAL'?"
    },
    options: [
      { id: "a", text: { id: "Terbaik / Maksimal", en: "Best / Maximum" }, isCorrect: true },
      { id: "b", text: { id: "Sederhana", en: "Simple" }, isCorrect: false },
      { id: "c", text: { id: "Memadai", en: "Adequate" }, isCorrect: false },
      { id: "d", text: { id: "Awal", en: "Initial" }, isCorrect: false }
    ]
  },
  {
    id: 24,
    category: "logical",
    q: {
      id: "Jika semua X adalah Y, dan tiada satu pun Y adalah Z, manakah pernyataan yang PASTI BENAR?",
      en: "If all X are Y, and no Y is Z, which statement is GUARANTEED TRUE?"
    },
    options: [
      { id: "a", text: { id: "Tiada satu pun X adalah Z", en: "No X is Z" }, isCorrect: true },
      { id: "b", text: { id: "Semua X adalah Z", en: "All X are Z" }, isCorrect: false },
      { id: "c", text: { id: "Sebagian X adalah Z", en: "Some X are Z" }, isCorrect: false },
      { id: "d", text: { id: "Semua Z adalah Y", en: "All Z are Y" }, isCorrect: false }
    ]
  },
  {
    id: 25,
    category: "numerical",
    q: {
      id: "Jika Anda memiliki 3 lusin pulpen dan membagikan setengahnya kepada teman Anda, berapa sisa pulpen Anda?",
      en: "If you have 3 dozen pens and give half of them to your friend, how many pens do you have left?"
    },
    options: [
      { id: "a", text: { id: "18 buah (3 x 12 = 36 / 2 = 18)", en: "18 pieces" }, isCorrect: true },
      { id: "b", text: { id: "12 buah", en: "12 pieces" }, isCorrect: false },
      { id: "c", text: { id: "24 buah", en: "24 pieces" }, isCorrect: false },
      { id: "d", text: { id: "6 buah", en: "6 pieces" }, isCorrect: false }
    ]
  },
  {
    id: 26,
    category: "spatial",
    q: {
      id: "Sebuah roda berputar sebanyak 24 kali dalam waktu 8 detik. Berapa kali roda berputar dalam waktu 24 detik?",
      en: "A wheel rotates 24 times in 8 seconds. How many times will it rotate in 24 seconds?"
    },
    options: [
      { id: "a", text: { id: "72 kali", en: "72 times" }, isCorrect: true },
      { id: "b", text: { id: "48 kali", en: "48 times" }, isCorrect: false },
      { id: "c", text: { id: "96 kali", en: "96 times" }, isCorrect: false },
      { id: "d", text: { id: "120 kali", en: "120 times" }, isCorrect: false }
    ]
  },
  {
    id: 27,
    category: "verbal",
    q: {
      id: "Es : Air :: Air : ...?",
      en: "Ice : Water :: Water : ...?"
    },
    options: [
      { id: "a", text: { id: "Uap / Gas", en: "Steam / Gas" }, isCorrect: true },
      { id: "b", text: { id: "Dingin", en: "Cold" }, isCorrect: false },
      { id: "c", text: { id: "Sungai", en: "River" }, isCorrect: false },
      { id: "d", text: { id: "Basah", en: "Wet" }, isCorrect: false }
    ]
  },
  {
    id: 28,
    category: "logical",
    q: {
      id: "Dua hari sebelum hari kemarin adalah hari Selasa. Jadi, hari ini adalah...",
      en: "Two days before yesterday was Tuesday. Therefore, today is..."
    },
    options: [
      { id: "a", text: { id: "Jumat (Selasa + 2 hari = Kamis (kemarin), maka hari ini Jumat)", en: "Friday" }, isCorrect: true },
      { id: "b", text: { id: "Kamis", en: "Thursday" }, isCorrect: false },
      { id: "c", text: { id: "Rabu", en: "Wednesday" }, isCorrect: false },
      { id: "d", text: { id: "Sabtu", en: "Saturday" }, isCorrect: false }
    ]
  },
  {
    id: 29,
    category: "numerical",
    q: {
      id: "Hasil dari 5 + 5 / 5 x 5 - 5 adalah...",
      en: "The result of 5 + 5 / 5 x 5 - 5 is..."
    },
    options: [
      { id: "a", text: { id: "5 (Bekerja dari bagi -> kali -> tambah -> kurang: 5 + (1 x 5) - 5 = 5)", en: "5" }, isCorrect: true },
      { id: "b", text: { id: "25", en: "25" }, isCorrect: false },
      { id: "c", text: { id: "0", en: "0" }, isCorrect: false },
      { id: "d", text: { id: "10", en: "10" }, isCorrect: false }
    ]
  },
  {
    id: 30,
    category: "spatial",
    q: {
      id: "Jika cermin vertikal diletakkan di sebelah kanan huruf 'F', bayangan huruf tersebut di cermin berupa...",
      en: "If a vertical mirror is placed to the right of the letter 'F', the letter's shadow in the mirror looks like..."
    },
    options: [
      { id: "a", text: { id: "Ekor horizontal menunjuk ke kiri (Terbalik horizontal)", en: "Horizontal strokes pointing left (Horizontally reversed)" }, isCorrect: true },
      { id: "b", text: { id: "F terbalik vertikal (Atas jadi bawah)", en: "F vertically flipped" }, isCorrect: false },
      { id: "c", text: { id: "Tetap huruf F seperti biasa", en: "Normal standard F" }, isCorrect: false },
      { id: "d", text: { id: "Huruf E", en: "Letter E" }, isCorrect: false }
    ]
  },
  {
    id: 31,
    category: "verbal",
    q: {
      id: "Petani berhubungan dengan Sawah sebagaimana Pelaut berhubungan dengan...",
      en: "Farmer is to Field as Sailor is to..."
    },
    options: [
      { id: "a", text: { id: "Laut / Samudra", en: "Sea / Ocean" }, isCorrect: true },
      { id: "b", text: { id: "Pelabuhan", en: "Port" }, isCorrect: false },
      { id: "c", text: { id: "Kapal", en: "Ship" }, isCorrect: false },
      { id: "d", text: { id: "Ikan", en: "Fish" }, isCorrect: false }
    ]
  },
  {
    id: 32,
    category: "numerical",
    q: {
      id: "Seri angka: 100, 95, 85, 70, 50, ... Angka berikutnya adalah...",
      en: "Number series: 100, 95, 85, 70, 50, ... What is the next number?"
    },
    options: [
      { id: "a", text: { id: "25 (-5, -10, -15, -20, -25)", en: "25" }, isCorrect: true },
      { id: "b", text: { id: "30", en: "30" }, isCorrect: false },
      { id: "c", text: { id: "35", en: "35" }, isCorrect: false },
      { id: "d", text: { id: "20", en: "20" }, isCorrect: false }
    ]
  },
  {
    id: 33,
    category: "logical",
    q: {
      id: "Jika semua burung bertelur, dan beberapa jenis hewan air adalah burung. Maka...",
      en: "If all birds lay eggs, and some water-dwelling creatures are birds. Then..."
    },
    options: [
      { id: "a", text: { id: "Sebagian hewan air bertelur", en: "Some water-dwelling creatures lay eggs" }, isCorrect: true },
      { id: "b", text: { id: "Semua hewan air pasti bertelur", en: "All water creatures lay eggs" }, isCorrect: false },
      { id: "c", text: { id: "Tidak ada hewan air yang bertelur", en: "No water creatures lay eggs" }, isCorrect: false },
      { id: "d", text: { id: "Hanya burung yang bisa berenang", en: "Only birds can swim" }, isCorrect: false }
    ]
  },
  {
    id: 34,
    category: "spatial",
    q: {
      id: "Jika sebuah jarum kompas diputar 180 derajat searah jarum jam, lalu diputar 90 derajat berlawanan jarum jam, di mana posisi ujung kompas sekarang (awalnya Utara)?",
      en: "If a compass needle is rotated 180 degrees clockwise, and then 90 degrees counter-clockwise, where is the needle pointing now (initially North)?"
    },
    options: [
      { id: "a", text: { id: "Timur (U, ke S (180), lalu balik 90 -> Timur)", en: "East" }, isCorrect: true },
      { id: "b", text: { id: "Barat", en: "West" }, isCorrect: false },
      { id: "c", text: { id: "Selatan", en: "South" }, isCorrect: false },
      { id: "d", text: { id: "Utara", en: "North" }, isCorrect: false }
    ]
  },
  {
    id: 35,
    category: "numerical",
    q: {
      id: "Berapa hasil dari 12 x 12 dibagi 4 + 14?",
      en: "What is 12 x 12 divided by 4 plus 14?"
    },
    options: [
      { id: "a", text: { id: "50 (144 / 4 = 36 + 14 = 50)", en: "50" }, isCorrect: true },
      { id: "b", text: { id: "48", en: "48" }, isCorrect: false },
      { id: "c", text: { id: "52", en: "52" }, isCorrect: false },
      { id: "d", text: { id: "44", en: "44" }, isCorrect: false }
    ]
  },
  {
    id: 36,
    category: "logical",
    q: {
      id: "Jika A selesai sebelum B, dan B selesai setelah C, tetapi C selesai sebelum A, siapakah yang selesai paling cepat?",
      en: "If A finishes before B, and B finishes after C, but C finishes before A, who finishes first?"
    },
    options: [
      { id: "a", text: { id: "C (Urutan: C lalu A lalu B)", en: "C" }, isCorrect: true },
      { id: "b", text: { id: "A", en: "A" }, isCorrect: false },
      { id: "c", text: { id: "B", en: "B" }, isCorrect: false },
      { id: "d", text: { id: "Sama cepat", en: "Equally fast" }, isCorrect: false }
    ]
  },
  {
    id: 37,
    category: "verbal",
    q: {
      id: "Kamus berhubungan dengan Kata sebagaimana Atlas berhubungan dengan...",
      en: "Dictionary is to Words as Atlas is to..."
    },
    options: [
      { id: "a", text: { id: "Peta / Lokasi Geografis", en: "Maps / Geographic Locations" }, isCorrect: true },
      { id: "b", text: { id: "Samudra", en: "Oceans" }, isCorrect: false },
      { id: "c", text: { id: "Buku", en: "Books" }, isCorrect: false },
      { id: "d", text: { id: "Negara", en: "Countries" }, isCorrect: false }
    ]
  },
  {
    id: 38,
    category: "numerical",
    q: {
      id: "Deret angka: 3, 9, 27, 81, ... Berapa angka lanjutan berikutnya?",
      en: "Number sequence: 3, 9, 27, 81, ... What is the next number?"
    },
    options: [
      { id: "a", text: { id: "243 (Perkalian 3 terus menerus)", en: "243" }, isCorrect: true },
      { id: "b", text: { id: "162", en: "162" }, isCorrect: false },
      { id: "c", text: { id: "324", en: "324" }, isCorrect: false },
      { id: "d", text: { id: "124", en: "124" }, isCorrect: false }
    ]
  },
  {
    id: 39,
    category: "spatial",
    q: {
      id: "Sebuah balok berukuran 4x3x2 ditumpuk di samping balok 2x3x2. Berapa volume total penggabungan kedua balok tersebut?",
      en: "A block measuring 4x3x2 is stacked next to a 2x3x2 block. What is the total combined volume of both blocks?"
    },
    options: [
      { id: "a", text: { id: "36 kubik ((4x3x2=24) + (2x3x2=12) = 36)", en: "36 cubic units" }, isCorrect: true },
      { id: "b", text: { id: "32 kubik", en: "32 cubic units" }, isCorrect: false },
      { id: "c", text: { id: "40 kubik", en: "40 cubic units" }, isCorrect: false },
      { id: "d", text: { id: "24 kubik", en: "24 cubic units" }, isCorrect: false }
    ]
  },
  {
    id: 40,
    category: "logical",
    q: {
      id: "Jika semua gitaris adalah pemusik, dan sebagian pemusik adalah guru asyik. Maka...",
      en: "If all guitarists are musicians, and some musicians are inspiring teachers. Then..."
    },
    options: [
      { id: "a", text: { id: "Sebagian pemusik mungkin gitaris sekaligus guru asyik", en: "Some musicians might turn out as guitarists and teachers" }, isCorrect: true },
      { id: "b", text: { id: "Semua gitaris pasti guru asyik", en: "All guitarists are inspiring teachers" }, isCorrect: false },
      { id: "c", text: { id: "Tidak ada guru asyik yang merupakan gitaris", en: "No inspiring teachers are guitarists" }, isCorrect: false },
      { id: "d", text: { id: "Semua guru asyik gemar gitar", en: "All teachers enjoy guitars" }, isCorrect: false }
    ]
  },
  {
    id: 41,
    category: "numerical",
    q: {
      id: "Jika harga sewa laptop per bulan Rp 500.000, berapa biaya yang harus dikeluarkan jika menyewa sebanyak 4 bulan dengan diskon 10%?",
      en: "If the monthly laptop rental is $100, how much does it cost in total for 4 months with a 10% discount?"
    },
    options: [
      { id: "a", text: { id: "Rp 1.800.000 ($360)", en: "Rp 1.800.000 ($360) [Total: 4x100=400 - 10%=360]" }, isCorrect: true },
      { id: "b", text: { id: "Rp 2.000.000 ($400)", en: "Rp 2.000.000 ($400)" }, isCorrect: false },
      { id: "c", text: { id: "Rp 1.600.000 ($320)", en: "Rp 1.600.000 ($320)" }, isCorrect: false },
      { id: "d", text: { id: "Rp 1.900.000 ($380)", en: "Rp 1.900.000 ($380)" }, isCorrect: false }
    ]
  },
  {
    id: 42,
    category: "spatial",
    q: {
      id: "Sebuah bidang datar digambar 4 buah garis lurus yang saling berpotongan secara acak. Berapa jumlah titik potong MAKSIMAL yang dapat dihasilkan?",
      en: "Four straight lines are drawn randomly intersecting on a flat plane. What is the MAXIMUM possible number of intersection points?"
    },
    options: [
      { id: "a", text: { id: "6 titik potong (Rumus: n*(n-1)/2)", en: "6 intersection points (Formula: n*(n-1)/2)" }, isCorrect: true },
      { id: "b", text: { id: "4 titik potong", en: "4 intersection points" }, isCorrect: false },
      { id: "c", text: { id: "8 titik potong", en: "8 intersection points" }, isCorrect: false },
      { id: "d", text: { id: "5 titik potong", en: "5 intersection points" }, isCorrect: false }
    ]
  },
  {
    id: 43,
    category: "verbal",
    q: {
      id: "Emas : Logam :: Mawar : ...?",
      en: "Gold : Metal :: Rose : ...?"
    },
    options: [
      { id: "a", text: { id: "Bunga / Tanaman", en: "Flower / Plant" }, isCorrect: true },
      { id: "b", text: { id: "Merah", en: "Red" }, isCorrect: false },
      { id: "c", text: { id: "Duri", en: "Thorn" }, isCorrect: false },
      { id: "d", text: { id: "Wangi", en: "Fragrant" }, isCorrect: false }
    ]
  },
  {
    id: 44,
    category: "numerical",
    q: {
      id: "Berapa hasil dari 1/2 + 1/4 + 1/8?",
      en: "What is the sum of 1/2 + 1/4 + 1/8?"
    },
    options: [
      { id: "a", text: { id: "7/8 (0.5 + 0.25 + 0.125 = 0.875)", en: "7/8" }, isCorrect: true },
      { id: "b", text: { id: "5/8", en: "5/8" }, isCorrect: false },
      { id: "c", text: { id: "3/4", en: "3/4" }, isCorrect: false },
      { id: "d", text: { id: "1", en: "1" }, isCorrect: false }
    ]
  },
  {
    id: 45,
    category: "logical",
    q: {
      id: "Jika 'RUMAH' didekode menjadi 'SVPBI', maka 'KILAT' didekode menjadi...",
      en: "If 'RUMAH' is encoded as 'SVPBI', then 'KILAT' is encoded as..."
    },
    options: [
      { id: "a", text: { id: "LJMBU (Maju satu huruf ke kanan di alfabet)", en: "LJMBU (Shift by 1 alpha-step)" }, isCorrect: true },
      { id: "b", text: { id: "KKMBU", en: "KKMBU" }, isCorrect: false },
      { id: "c", text: { id: "LJNBU", en: "LJNBU" }, isCorrect: false },
      { id: "d", text: { id: "LKFZU", en: "LKFZU" }, isCorrect: false }
    ]
  },
  {
    id: 46,
    category: "spatial",
    q: {
      id: "Sebuah roda gerobak berputar menempuh jarak 176 meter. Jika keliling lingkaran roda adalah 4 meter, berapa kali roda tersebut telah berputar penuh?",
      en: "A wagon wheel covers a distance of 176 meters. If the wheel's circumference is 4 meters, how many full rotations has it made?"
    },
    options: [
      { id: "a", text: { id: "44 kali (176 / 4 = 44)", en: "44 rotations" }, isCorrect: true },
      { id: "b", text: { id: "40 kali", en: "40 rotations" }, isCorrect: false },
      { id: "c", text: { id: "50 kali", en: "50 rotations" }, isCorrect: false },
      { id: "d", text: { id: "48 kali", en: "48 rotations" }, isCorrect: false }
    ]
  },
  {
    id: 47,
    category: "verbal",
    q: {
      id: "Kata mana yang memiliki kesamaan makna paling ideal dengan 'KONSISTEN'?",
      en: "Which word has the most ideal synonym with 'CONSISTENT'?"
    },
    options: [
      { id: "a", text: { id: "Ajeg / Stabil / Istikamah", en: "Steady / Stable / Persistent" }, isCorrect: true },
      { id: "b", text: { id: "Berubah-ubah", en: "Volatile" }, isCorrect: false },
      { id: "c", text: { id: "Sering kali", en: "Frequent" }, isCorrect: false },
      { id: "d", text: { id: "Tegas", en: "Strict" }, isCorrect: false }
    ]
  },
  {
    id: 48,
    category: "numerical",
    q: {
      id: "Seri angka: 1, 2, 4, 7, 11, 16, 22, ... Angka berikutnya adalah...",
      en: "Number series: 1, 2, 4, 7, 11, 16, 22, ... What is the next number?"
    },
    options: [
      { id: "a", text: { id: "29 (+1, +2, +3, +4, +5, +6, +7)", en: "29" }, isCorrect: true },
      { id: "b", text: { id: "28", en: "28" }, isCorrect: false },
      { id: "c", text: { id: "30", en: "30" }, isCorrect: false },
      { id: "d", text: { id: "32", en: "32" }, isCorrect: false }
    ]
  },
  {
    id: 49,
    category: "logical",
    q: {
      id: "Jika Ali adalah kakak Budi, dan Cici adalah adik Ali, siapakah yang PASTI paling tua?",
      en: "If Ali is Budi's older brother, and Cici is Ali's younger sister, who is DEFINITELY the oldest?"
    },
    options: [
      { id: "a", text: { id: "Ali (Ali lebih tua dari Budi dan Cici)", en: "Ali" }, isCorrect: true },
      { id: "b", text: { id: "Budi", en: "Budi" }, isCorrect: false },
      { id: "c", text: { id: "Cici", en: "Cici" }, isCorrect: false },
      { id: "d", text: { id: "Tidak ada data pasti", en: "Not enough info" }, isCorrect: false }
    ]
  },
  {
    id: 50,
    category: "spatial",
    q: {
      id: "Ada 3 kotak (A, B, C). Kotak A berisi buah apel. Kotak B kosong. Kotak C berisi buah jeruk. Jika Anda menukar isi kotak A dengan C, lalu memindahkan setengah isi kotak A baru ke kotak B. Di mana jeruk berada sekarang?",
      en: "There are 3 boxes (A, B, C). Box A has apples. Box B is empty. Box C has oranges. You swap contents of A and C, then move half of the new Box A to Box B. Where are the oranges now?"
    },
    options: [
      { id: "a", text: { id: "Di kotak A dan B (Orat-oret: Jeruk pindah ke A lalu dibagi ke B)", en: "In Box A and Box B" }, isCorrect: true },
      { id: "b", text: { id: "Di kotak A saja", en: "In Box A only" }, isCorrect: false },
      { id: "c", text: { id: "Di kotak B saja", en: "In Box B only" }, isCorrect: false },
      { id: "d", text: { id: "Di kotak C saja", en: "In Box C only" }, isCorrect: false }
    ]
  }
];
