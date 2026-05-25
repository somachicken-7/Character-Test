export interface PsyQuestion {
  id: number;
  q: { id: string; en: string };
  options: {
    id: string;
    text: { id: string; en: string };
    points: number; // weight indicating psychopath trait/perspective mapping
    explanation: { id: string; en: string };
  }[];
}

export const psyQuestions: PsyQuestion[] = [
  {
    id: 1,
    q: {
      id: "Di pemakaman ibunya, seorang wanita bertemu dengan pria tampan yang belum pernah dia lihat sebelumnya. Dia langsung jatuh cinta. Tapi dia lupa menanyakan nomor teleponnya. Tiga hari kemudian, dia membunuh saudara perempuannya sendiri. Apa alasannya?",
      en: "At her mother's funeral, a woman meets a handsome man she has never seen before. She instantly falls in love. But she forgets to ask for his phone number. Three days later, she murders her own sister. What is her reason?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Dia berharap pria itu akan datang lagi ke pemakaman saudara perempuannya.",
          en: "She hopes the handsome man will attend her sister's funeral."
        },
        points: 10, // Classic psychopath analytical answer
        explanation: {
          id: "Jawaban dingin & murni logis pragmatis. Menunjukkan pola pikir yang mengabaikan empati demi keuntungan sasaran.",
          en: "Cold and purely logical pragmatic reply. Classic indicator of bypassing standard empathy blocks for goals."
        }
      },
      {
        id: "b",
        text: {
          id: "Dia marah karena saudara perempuannya juga menaruh hati pada pria itu.",
          en: "She is angry because her sister was also into that man."
        },
        points: 2,
        explanation: {
          id: "Jawaban berbasis emosi cemburu normal manusia.",
          en: "Standard emotion-driven answer based on everyday jealousy."
        }
      },
      {
        id: "c",
        text: {
          id: "Pria tampan itu ternyata adalah pacar rahasia ayahnya.",
          en: "The handsome man turns out to be her father's secret partner."
        },
        points: 1,
        explanation: {
          id: "Teori drama komedi kreatif yang menjauhi logika dingin pembunuhan.",
          en: "Creative sitcom drama answer completely avoiding cold-blooded logic."
        }
      },
      {
        id: "d",
        text: {
          id: "Dia mengalami depresi berat pasca kematian ibunya dan kehilangan kendali diri.",
          en: "She was severely depressed after her mother's death and lost control."
        },
        points: 0,
        explanation: {
          id: "Jawaban normal berbasis simpati moral kemanusiaan.",
          en: "Standard reply deeply rooted in sympathetic human psychology."
        }
      }
    ]
  },
  {
    id: 2,
    q: {
      id: "Anda sedang berdiri di balkon lantai 10 dan melihat seekor anjing kecil terjebak di tengah jalan yang ramai. Apa hal pertama yang meluncur di pikiran Anda?",
      en: "You are standing on a 10th-floor balcony and see a tiny dog stranded in the middle of a super-busy street. What is your very first thought?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Menghitung probabilitas waktu mobil mengerem dan mencatat pola aliran lalu lintas.",
          en: "Calculate the mathematical probability of braking times and log the traffic patterns."
        },
        points: 8,
        explanation: {
          id: "Fokus pada angka mekanis tanpa keterikatan emosional pada kepanikan makhluk bernyawa.",
          en: "Intense mechanical focus completely detached from organic empathy."
        }
      },
      {
        id: "b",
        text: {
          id: "Merasa panik luar biasa, berteriak, dan berupaya turun mencari bantuan penyelamatan.",
          en: "Feel incredibly panicked, scream, and run down to find help/rescue."
        },
        points: 0,
        explanation: {
          id: "Reaksi empati spontan, sangat khas manusia normal.",
          en: "Spontaneous empathetic reaction, highly characteristic of normal human attachment."
        }
      },
      {
        id: "c",
        text: {
          id: "Mengambil HP Anda untuk memotret atau membuat konten video viral di media sosial.",
          en: "Pull out your phone to take photos/videos for viral social coverage."
        },
        points: 5,
        explanation: {
          id: "Kecenderungan oportunis modern, lebih memikirkan ketenaran dibanding bahaya sekitar.",
          en: "Opportunistic modern stance, preferring social clout over urgent safety."
        }
      },
      {
        id: "d",
        text: {
          id: "Menutup mata atau berbalik karena tidak sanggup melihat kejadian tragis.",
          en: "Close your eyes or turn back because you cannot bear to witness tragedy."
        },
        points: 1,
        explanation: {
          id: "Mekanisme pertahanan diri yang sensitif guna melindungi kedamaian batin.",
          en: "High-sensitivity shield mechanism protecting internal mental hygiene."
        }
      }
    ]
  },
  {
    id: 3,
    q: {
      id: "Seorang musuh besar Anda jatuh miskin dan terpaksa memohon pekerjaan di toko kecil milik Anda. Apa keputusan terpintar Anda?",
      en: "An arch-nemesis of yours goes completely bankrupt and begs for a junior job at your small grocery store. What is your smartest move?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Menerimanya bekerja dengan gaji sangat minim, lalu perlahan menjatuhkan mentalnya setiap hari.",
          en: "Hire them at absolute minimum wage, then systemically break down their confidence daily."
        },
        points: 10,
        explanation: {
          id: "Pola pembalasan taktis, manipulatof, dan penuh kendali dingin jangka panjang.",
          en: "Tactical, manipulative revenge mindset enjoying long-term psychological control."
        }
      },
      {
        id: "b",
        text: {
          id: "Menolak mentah-mentah secara kasar dan menyuruhnya pergi menjauh.",
          en: "Reject them with loud anger and demand they stay away forever."
        },
        points: 3,
        explanation: {
          id: "Luapan kemarahan spontan langsung, tidak manipulatif agresif.",
          en: "Immediate emotional outburst, non-manipulative aggression."
        }
      },
      {
        id: "c",
        text: {
          id: "Menerimanya dengan tulus, memaafkan masa lalu, dan membantunya bangkit secara setara.",
          en: "Hire them with absolute sincerity, forgiving the past, and help them rebuild."
        },
        points: 0,
        explanation: {
          id: "Prinsip cinta damai, penuh maaf, dan moralitas luhur.",
          en: "Noble peace-making principles, high compassion and forgiveness."
        }
      },
      {
        id: "d",
        text: {
          id: "Memberinya bantuan dana pinjaman secukupnya tanpa perlu mempekerjakannya.",
          en: "Provide a small survival loan without having to employ them at your place."
        },
        points: 1,
        explanation: {
          id: "Logika praktis solutif yang menjaga jarak demi keselamatan bersama.",
          en: "Pragmatic problem solver preserving safe healthy boundaries."
        }
      }
    ]
  },
  {
    id: 4,
    q: {
      id: "Anda sedang menonton adegan film di mana penjahat utama memenangkan pertempuran sengit melawan pahlawan protagonis. Bagaimana perasaan Anda?",
      en: "You are watching a film climax scene where the main villain wins a tactical battle against the hero. How do you feel inside?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Merasa sangat puas demi keunikan estetika, tanpa peduli nasib tragis si pahlawan.",
          en: "Feel incredibly satisfied for the aesthetic twist, not care at all about the hero's fate."
        },
        points: 8,
        explanation: {
          id: "Pesona pada kekuasaan, kemenangan mutlak, dan manipulasi tingkat tinggi.",
          en: "Deep admiration for strategic dominance, power, and high-level manipulation."
        }
      },
      {
        id: "b",
        text: {
          id: "Kecewa besar, sedih, dan merasai kegagalan keadilan dalam dunia fiksi.",
          en: "Severely disappointed, sad, and lament the failure of justice in the fiction."
        },
        points: 0,
        explanation: {
          id: "Keterikatan emosional moralis standar yang mencari keseimbangan kebajikan.",
          en: "Standard moral emotional attachment that seeks active triumph of virtue."
        }
      },
      {
        id: "c",
        text: {
          id: "Melihatnya murni dari sudut pandang sinematografi, akting, dan pencahayaan kamera.",
          en: "Analyze it strictly from technical cinematography, acting, and lighting scales."
        },
        points: 3,
        explanation: {
          id: "Pendekatan analitis intelektual yang mengabstraksi muatan moral fiksi.",
          en: "Intelecual analytical approach abstracting the fiction's core moral weight."
        }
      },
      {
        id: "d",
        text: {
          id: "Biasa saja, langsung mematikan TV karena merasa mengantuk.",
          en: "Indifferent, switch the TV off immediately because you feel sleepy."
        },
        points: 1,
        explanation: {
          id: "Ketenangan netral yang tidak mudah terprovokasi drama eksternal.",
          en: "Neutral calmness completely unaffected by external drama loops."
        }
      }
    ]
  },
  {
    id: 5,
    q: {
      id: "Ada sebuah tombol merah misterius. Jika ditekan, Anda mendapatkan uang Rp 1 Miliar ($100,000) tunai gratis, namun ada satu orang asing yang tak Anda kenal di belahan bumi lain akan lenyap seketika. Berapa kali Anda menekannya?",
      en: "There is a mysterious red button. Pressing it rewards you with $100,000 cash instantly, but one random stranger in a distant land disappears instantly. How many times would you press it?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Menekannya berulang kali sampai saya menjadi orang terkaya tanpa merasa bersalah sedikit pun.",
          en: "Press it repeatedly until I am a multi-millionaire, without a single shred of guilt."
        },
        points: 10,
        explanation: {
          id: "Ketiadaan total penyesalan, empati, atau pembatas moral sosial. Murni utilitaris egois berdarah dingin.",
          en: "Total absence of remorse, empathy, or moral barriers. Pure cold-blooded egoism."
        }
      },
      {
        id: "b",
        text: {
          id: "Menekannya tepat SATU KALI saja karena saya sedang terlilit utang darurat, lalu menyesal seumur hidup.",
          en: "Press it exactly ONCE out of extreme urgent debt, then regret it for the rest of my life."
        },
        points: 4,
        explanation: {
          id: "Kompromi moral akibat keputusasaan pragmatis, masih disertai rasa bersalah.",
          en: "Moral compromise due to desperate realism, still paired with active regret."
        }
      },
      {
        id: "c",
        text: {
          id: "Sama sekali TIDAK AKAN menekannya karena nyawa manusia lain berharga tak ternilai.",
          en: "Will NEVER press it because another human's life is priceless and sacred."
        },
        points: 0,
        explanation: {
          id: "Integritas moral luhur, penjaga kedamaian universal sejati.",
          en: "High moral integrity, a true guardian of peaceful human lives."
        }
      },
      {
        id: "d",
        text: {
          id: "Mencari celah hukum atau meretas sistem tombol tersebut agar uangnya mengalir tanpa ada korban.",
          en: "Find a technical loophole or hack the button interface to bypass the casualty check."
        },
        points: 2,
        explanation: {
          id: "Kecerdasan taktis inovatif mencari rute aman tanpa konflik moral.",
          en: "Innovative tactical brains seeking bypass channels avoiding moral weights."
        }
      }
    ]
  },
  {
    id: 6,
    q: {
      id: "Kenapa kucing liar di dekat rumah suka sekali bersembunyi dari pandangan manusia?",
      en: "Why do stray cats near houses love to actively hide from human eyes?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Mereka sedang mengintai sasaran potensial untuk diserang secara diam-diam begitu manusia lengah.",
          en: "They are tracking potential targets to launch stealth strikes when humans are off-guard."
        },
        points: 8,
        explanation: {
          id: "Proyeksi pemikiran taktis predator-vs-mangsa pada binatang peliharaan.",
          en: "Projection of tactical predator-vs-prey mindset onto domestic animals."
        }
      },
      {
        id: "b",
        text: {
          id: "Mungkin mereka mengalami trauma luka masa lalu atau merasa takut disakiti oleh manusia.",
          en: "They might have painful past trauma or are genuinely scared of human abuse."
        },
        points: 0,
        explanation: {
          id: "Empati mendalam pada penderitaan hewan, khas jiwa penyayang hangat.",
          en: "Deep organic empathy for animal distress, highly compassionate."
        }
      },
      {
        id: "c",
        text: {
          id: "Murni insting metabolisme bertahan hidup alami dan mencari area suhu yang lebih sejuk.",
          en: "Simple biological survival mechanics and looking for cooler thermal comfort spots."
        },
        points: 2,
        explanation: {
          id: "Logika ilmiah rasional yang objektif dan bebas prasangka emosional.",
          en: "Objective scientific logic detached from any emotional projection bias."
        }
      },
      {
        id: "d",
        text: {
          id: "Mereka hanya ingin tidur tenang tanpa diganggu oleh keberisikan langkah kaki.",
          en: "They just want to sleep in peace away from the noisy human footsteps."
        },
        points: 1,
        explanation: {
          id: "Perspektif cinta damai dan kenyamanan privat yang mendasar.",
          en: "A peaceful preference for simple rest and quiet personal space."
        }
      }
    ]
  },
  {
    id: 7,
    q: {
      id: "Sahabat terdekat Anda baru saja lolos dari beasiswa bergengsi yang telah lama Anda impikan, sementara Anda gagal total. Apa tindakan Anda di acara kemenangannya?",
      en: "Your best friend wins a prestigious scholarship you've always dreamed of, while you fail completely. How do you act at their celebration party?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Mengingat-ingat semua kelemahan sahabat tersebut dan menyebarkannya dengan senyum manis berseri.",
          en: "Re-log all of their personal failures and spread rumors quietly while keeping a massive sweet smile."
        },
        points: 10,
        explanation: {
          id: "Taktik manipulatif agresif terselubung (machiavellian). Kejam namun berbalut topeng manis.",
          en: "Machiavellian stealth warfare. Ruthless actions wrapped in flawless charming masks."
        }
      },
      {
        id: "b",
        text: {
          id: "Mengaku bahwa Anda merasa sedih atas kegagalan Anda, tapi ikut merayakan keberhasilannya dengan lapang dada.",
          en: "Admit your sadness honestly over your failure, but toast their victory whole-heartedly."
        },
        points: 0,
        explanation: {
          id: "Kematangan emosional murni, jujur pada diri sendiri, dan menjunjung tinggi relasi tulus.",
          en: "Pure emotional maturity, transparently honest, and supportive of genuine bonds."
        }
      },
      {
        id: "c",
        text: {
          id: "Membuat alasan mendadak sakit atau sibuk sehingga Anda tidak perlu repot-repot hadir.",
          en: "Make a sudden excuse of being sick or too busy so you don't have to show up at all."
        },
        points: 2,
        explanation: {
          id: "Menghindari rasa tidak nyaman secara praktis guna menjaga stabilitas mental.",
          en: "Safe avoidance to preserve personal stability and prevent bitter comparisons."
        }
      },
      {
        id: "d",
        text: {
          id: "Menganalisis berkas pengajuan beasiswanya untuk menyusun replikasi strategi yang lebih unggul tahun depan.",
          en: "Analyse their application files systemically to duplicate their strategies and beat them next year."
        },
        points: 4,
        explanation: {
          id: "Berorientasi pada target tinggi, logis, dan mengubah kecemburuan menjadi data kompetisi nyata.",
          en: "Target-driven, transforming friction into cold strategic planning metrics."
        }
      }
    ]
  },
  {
    id: 8,
    q: {
      id: "Pilih salah satu lukisan abstrak yang paling memikat hati Anda saat ini:",
      en: "Choose an abstract artwork theme that captivates your inner self the most right now:"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Goresan garis hitam tajam asimetris di atas kanvas putih yang steril tanpa warna.",
          en: "Asymmetrical sharp black lines slashed over a sterile, dead-white empty canvas."
        },
        points: 8,
        explanation: {
          id: "Menyukai ketajaman, dominasi batas tegas, struktur steril, dan ketiadaan nuansa emosi hangat.",
          en: "Prefers razor efficiency, sterile order, and complete lack of warm emotional noise."
        }
      },
      {
        id: "b",
        text: {
          id: "Pemandangan awan senja hangat keemasan berpadu dengan riak danau yang tenang.",
          en: "A warm, golden twilight clouds scenery melting into a quiet rippling lake."
        },
        points: 0,
        explanation: {
          id: "Mencari keharmonisan, kedamaian visual, dan ketenteraman batin.",
          en: "Craves cozy serenity, visual harmony, and gentle inner peace."
        }
      },
      {
        id: "c",
        text: {
          id: "Ledakan warna-warni cat cerah berantakan yang mencerminkan histeria festival jalanan.",
          en: "An chaotic explosion of bright neon paint splashes portraying a festive street riot."
        },
        points: 2,
        explanation: {
          id: "Kreatif, penuh antusiasme sosial, menyukai stimulus visual berenergi tinggi.",
          en: "Expressive, highly social, thrives on high-energy artistic stimulation."
        }
      },
      {
        id: "d",
        text: {
          id: "Pola arsitektur simetris presisi dengan perhitungan sudut geometris yang sempurna.",
          en: "Symmetrical blueprints with flawless, high-precision geometric calculations."
        },
        points: 3,
        explanation: {
          id: "Analitis, mencintai ketertiban data, suka ketelitian dan hukum ilmu pasti.",
          en: "Analytical, deeply values rules, structures, statistics, and flawless systems."
        }
      }
    ]
  },
  {
    id: 9,
    q: {
      id: "Jika Anda terpaksa harus menyampaikan kabar duka (kematian) kepada keluarga salah satu kolega kerja Anda, bagaimana cara Anda menyampaikannya?",
      en: "If you have to personally break the news of a sudden tragic loss of a colleague to their family, how do you handle it?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Mengirim SMS / pesan tulisan otomatis padat info agar tugas berat ini cepat selesai tanpa drama.",
          en: "Send a factual, auto-generated SMS text summary directly to finish the heavy duty with zero drama."
        },
        points: 10,
        explanation: {
          id: "Mengutamakan efisiensi pragmatis murni dengan detasemen emosi tanpa rasa cemas.",
          en: "Prioritizes high administrative speed with absolute detachment from human distress."
        }
      },
      {
        id: "b",
        text: {
          id: "Hadir secara langsung dengan nada sangat hati-hati, memeluk mereka, dan merasai kesedihan bersama.",
          en: "Show up in person, use a highly gentle tone, embrace them, and hold safe space for their tears."
        },
        points: 0,
        explanation: {
          id: "Respons empati tulus dan kepekaan rasa kemanusiaan.",
          en: "Highly empathetic response, putting human relational warmth first."
        }
      },
      {
        id: "c",
        text: {
          id: "Meminta bantuan pimpinan HRD atau divisi profesional krisis untuk melakukannya menggantikan posisi Anda.",
          en: "Delegate the task to HR experts or a crisis manager to avoid dealing with it directly."
        },
        points: 2,
        explanation: {
          id: "Menggantungkan tugas pada sistem guna menghindari situasi tidak nyaman.",
          en: "Utilizes structural delegation to safely avoid intense friction zones."
        }
      },
      {
        id: "d",
        text: {
          id: "Menyusun kata-kata yang lugas tapi sopan secara berurutan, lalu menyuarakannya dengan intonasi tenang.",
          en: "Draft clear but polite structured points beforehand, delivering them with a calm, neutral tone."
        },
        points: 4,
        explanation: {
          id: "Menghadapi tantangan secara logis, bersikap profesional tanpa membiarkan emosi meluap-luap.",
          en: "Preserves solid professional duty with highly structured verbal control."
        }
      }
    ]
  },
  {
    id: 10,
    q: {
      id: "Seorang rekan kerja sering sekali meminjam pulpen premium kesayangan Anda tanpa pamit dan selalu lupa mengembalikannya. Apa tindakan balasan Anda?",
      en: "A coworker constantly borrows your signature premium pen without permission and forgets to return it. What is your clever checkmate?"
    },
    options: [
      {
        id: "a",
        text: {
          id: "Mengisi silinder pulpen tersebut dengan tinta khusus yang akan bocor hebat saat tutupnya dibuka.",
          en: "Fill the pen's ink chamber with a specialized dye that leaks massively upon opening."
        },
        points: 9,
        explanation: {
          id: "Menyukai jebakan kreatif pasif-agresif terencana yang taktiknya sulit dideteksi secara terbuka.",
          en: "Prefers highly planned, stealth traps. Creative payback that avoids direct confrontation footprints."
        }
      },
      {
        id: "b",
        text: {
          id: "Menegurnya secara berwibawa di hadapan rapat tim kerja demi menghentikan perilakunya.",
          en: "Assertively demand it back in front of a staff meeting to publicly secure your boundary."
        },
        points: 4,
        explanation: {
          id: "Konfrontasi berani langsung demi tercapainya keadilan teritorial.",
          en: "Direct courageous confrontation aiming for quick territorial justice."
        }
      },
      {
        id: "c",
        text: {
          id: "Membiarkannya saja karena pulpen bisa dibeli lagi, dan hubungan pertemanan jauh lebih berharga.",
          en: "Let it be. Pens can be re-purchased easily, while relationships are priceless."
        },
        points: 0,
        explanation: {
          id: "Jiwa amiable yang pasif demi menghindari perselisihan kecil.",
          en: "Highly passive, amiable nature prioritising conflict avoidance over tiny assets."
        }
      },
      {
        id: "d",
        text: {
          id: "Membeli pulpen murah palsu bermerek sama untuk diletakkan di meja, lalu menyembunyikan yang asli.",
          en: "Buy a cheap mock replica for the desk decoy, while locking your real premium pen in a drawer."
        },
        points: 2,
        explanation: {
          id: "Pemecahan masalah yang efisien, cerdik, aman, tanpa memicu perang urat syaraf.",
          en: "Smart, secure preventive tactics avoiding interpersonal warfare altogether."
        }
      }
    ]
  }
];
