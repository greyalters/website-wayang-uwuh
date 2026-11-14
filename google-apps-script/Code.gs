/**
 * Google Apps Script untuk Google Form "Tambah Produk Wayang Uwuh".
 * Pasang: buka Google Form > titik tiga > Apps Script > tempel kode ini.
 * Lalu Triggers (ikon jam) > Add Trigger > fungsi onFormSubmit, event "From form", "On form submit".
 *
 * Judul pertanyaan di Form HARUS sama dengan nilai di FIELD di bawah.
 * Pilihan "Jenis/Kategori" : Wayang, Lukis Kaca, Lukis Besek, Lukis Kanvas.
 */
const WEBSITE_URL = 'https://NAMA-PROJECT.vercel.app/api/produk'; // ganti dengan domain Vercel
const SECRET_TOKEN = 'ganti-dengan-token-acak-panjang';             // sama dengan FORM_SECRET_TOKEN di Vercel

const FIELD = {
  nama: 'Nama Wayang',
  kategori: 'Jenis/Kategori Wayang',
  cerita: 'Cerita/Detail Wayang',
  harga: 'Harga Jual',
  foto: 'Foto Wayang',
};

function onFormSubmit(e) {
  const response = e.response;
  const data = {};
  let fileId = null;

  response.getItemResponses().forEach(function (ir) {
    const title = ir.getItem().getTitle().trim();
    const val = ir.getResponse();
    if (title === FIELD.foto) fileId = Array.isArray(val) ? val[0] : val;
    else Object.keys(FIELD).forEach(function (k) { if (FIELD[k] === title) data[k] = val; });
  });

  if (!fileId) throw new Error('Foto tidak ditemukan');
  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();
  data.foto = { base64: Utilities.base64Encode(blob.getBytes()), mimeType: blob.getContentType(), name: file.getName() };

  const res = UrlFetchApp.fetch(WEBSITE_URL, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + SECRET_TOKEN },
    payload: JSON.stringify(data),
    muteHttpExceptions: true,
  });

  const ok = res.getResponseCode() === 200 && JSON.parse(res.getContentText()).ok === true;
  if (!ok) {
    // Data TIDAK dihapus bila gagal, supaya bisa dicoba lagi.
    throw new Error('Gagal mengirim ke website: ' + res.getResponseCode() + ' ' + res.getContentText());
  }

  // Website sudah mengonfirmasi data tersimpan -> hapus respons & foto agar storage Google tidak penuh.
  file.setTrashed(true);
  FormApp.getActiveForm().deleteResponse(response.getId());
}
