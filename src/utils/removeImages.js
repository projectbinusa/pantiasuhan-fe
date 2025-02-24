export function removeImages(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("img").forEach((img) => img.remove()); // Hapus semua gambar
  return doc.body.innerHTML; // Ambil kembali HTML tanpa gambar
};