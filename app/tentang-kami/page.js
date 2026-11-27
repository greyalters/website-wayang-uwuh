import Image from "next/image";

export const metadata = { title: "Tentang Kami | Wayang Uwuh" };

// Ganti dengan foto asli: taruh file di folder public/ lalu ubah nama filenya di sini (mis. "/iskandar.jpg").
const FOTO = "/iskandar.png";

const PARAGRAF_1 =
  "Wayang Uwuh bermula pada 2013 di tepian Sungai Ciliwung, saat Bapak Iskandar Harjodimulyo menjadi relawan seni penyadaran. Setelah banjir besar surut, sampah berserakan memberi beliau gagasan untuk mengolahnya menjadi karya seni. Sampah sebagai persoalan lingkungan beliau padukan dengan wayang sebagai seni budaya, menjawab keterbatasan anggaran mengikuti pameran internasional.";
const PARAGRAF_2 =
  "Wayang pertama beliau berbahan botol plastik bekas. Setelah beberapa kali gagal karena plastik meleleh saat dipanaskan, beliau menemukan cara menyetrika botol di antara lapisan kain dan koran hingga menjadi lembaran. Bahan pun berkembang, mulai dari triplek, seng, dan kardus hingga berbagai jenis plastik bekas.";
const PARAGRAF_3 =
  "Dalam acara Pasar Seni di Bandung, beliau secara spontan mengarak wayang-wayang tersebut berkeliling lokasi dengan iringan musik sederhana dan berhasil menarik banyak penonton. Seorang kenalan yang menyaksikannya kemudian menyebutnya “Wayang Uwuh”, yang lalu beliau pakai sebagai nama dan identitas bagi seluruh karyanya hingga kini.";

// Isi "url" dengan alamat artikelnya kalau mau judulnya bisa diklik.
const ARTIKEL = [
  { judul: "Kisah Iskandar Pencipta Wayang Uwuh, dari Banjir Ciliwung hingga Banjir Pesanan", sumber: "Kompas", url: "" },
  { judul: "Profil Iskandar Harjodimulyo Sang Maestro Wayang Uwuh, Olah Limbah Jadi Karya", sumber: "Tempo", url: "" },
  { judul: "Wayang Uwuh Karya Iskandar Menjelajah Hingga Luar Negeri", sumber: "Times Indonesia", url: "" },
  { judul: "Kisah Iskandar Sulap Sampah Jadi Wayang Uwuh, Eksis hingga Museum Belanda", sumber: "Detikjogja", url: "" },
  { judul: "Wayang Uwuh, dari Sampah Menjadi Karya Seni", sumber: "Perpusnas", url: "" },
];

export default function TentangKami() {
  return (
    <div className="tentang">
      <article className="tentang-isi">

        <div className="tentang-awal">
          <div className="tentang-foto">
            <Image src={FOTO} alt="Foto Pak Iskandar Harjodimulyo" fill sizes="(max-width: 860px) 220px, 280px" />
          </div>
          <p>{PARAGRAF_1}</p>
        </div>

        <p>{PARAGRAF_2}</p>
        <p>{PARAGRAF_3}</p>

        <p className="tentang-artikel-judul">Artikel yang memuat mengenai Wayang Uwuh oleh Iskandar Harjodimulyo:</p>
        <ol className="tentang-artikel">
          {ARTIKEL.map((a) => (
            <li key={a.judul}>
              {a.url ? (
                <a href={a.url} target="_blank" rel="noopener noreferrer">{a.judul}</a>
              ) : (
                a.judul
              )}{" "}
              (Sumber: {a.sumber})
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
