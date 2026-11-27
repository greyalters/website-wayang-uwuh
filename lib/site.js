export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo Pak Iskandar, saya tertarik dengan Wayang Uwuh.")}`;
export const ALAMAT =
  "Jl. Bimasakti No.29, Demangan, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55221";

export function slugify(s) {
  return String(s).toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-") || "produk";
}

export function formatHarga(h) {
  if (h === null || h === undefined || String(h).trim() === "") return null;
  const n = Number(String(h).replace(/[^\d]/g, ""));
  if (!n) return String(h);
  return "Rp " + n.toLocaleString("id-ID");
}
