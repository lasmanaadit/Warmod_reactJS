// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\pages\footer\HowToBuy.jsx

import React from 'react';
import '../../styles/footerpages/FooterPages.css';

const HowToBuy = () => {
  return (
    <div className="footer-page">
      <div className="container">
        <div className="footer-page-header">
          <h1>Cara Pembelian</h1>
          <p>Panduan lengkap untuk melakukan pembelian di WARMOD</p>
        </div>
        
        <div className="footer-page-content">
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Registrasi Akun</h3>
                <p>Daftar akun WARMOD dengan email valid dan lengkapi profil Anda</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Pencarian Produk</h3>
                <p>Gunakan fitur pencarian atau jelajahi kategori untuk menemukan mod yang diinginkan</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Detail Produk</h3>
                <p>Baca deskripsi, spesifikasi, dan ulasan produk sebelum membeli</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Tambahkan ke Keranjang</h3>
                <p>Klik "Tambahkan ke Keranjang" atau "Beli Sekarang"</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Proses Checkout</h3>
                <p>Pilih metode pembayaran dan konfirmasi pesanan</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h3>Pembayaran</h3>
                <p>Selesaikan pembayaran sesuai instruksi yang diberikan</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">7</div>
              <div className="step-content">
                <h3>Download Mod</h3>
                <p>Setelah pembayaran dikonfirmasi, mod dapat di-download dari halaman "Transaksi Saya"</p>
              </div>
            </div>
          </div>

          <section className="tips-section">
            <h2>Tips Pembelian</h2>
            <ul>
              <li>Pastikan spesifikasi game dan sistem Anda kompatibel dengan mod</li>
              <li>Baca ulasan dari pembeli sebelumnya</li>
              <li>Periksa rating dan reputasi seller</li>
              <li>Simpan bukti pembayaran</li>
              <li>Hubungi seller jika mengalami kendala dengan mod</li>
            </ul>
          </section>

          <section className="support-section">
            <h2>Butuh Bantuan?</h2>
            <p>Jika mengalami masalah dalam pembelian, hubungi:</p>
            <ul>
              <li>Email: <strong>support@warmod.com</strong></li>
              <li>WhatsApp: <strong>+62 812-3456-7890</strong></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;