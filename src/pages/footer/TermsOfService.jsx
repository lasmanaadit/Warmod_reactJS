// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\pages\footer\TermsOfService.jsx

import React from 'react';
import '../../styles/footerpages/FooterPages.css';

const TermsOfService = () => {
  return (
    <div className="footer-page">
      <div className="container">
        <div className="footer-page-header">
          <h1>Syarat Layanan</h1>
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>
        
        <div className="footer-page-content">
          <section>
            <h2>1. Penerimaan Syarat</h2>
            <p>Dengan mengakses dan menggunakan platform WARMOD, Anda setuju untuk terikat oleh syarat dan ketentuan ini.</p>
          </section>

          <section>
            <h2>2. Akun Pengguna</h2>
            <p>Anda bertanggung jawab untuk:</p>
            <ul>
              <li>Menjaga kerahasiaan informasi akun</li>
              <li>Segera memberi tahu kami tentang penggunaan tidak sah</li>
              <li>Memenuhi semua persyaratan usia minimum (13 tahun)</li>
            </ul>
          </section>

          <section>
            <h2>3. Pembelian dan Penjualan</h2>
            <h3>Untuk Pembeli:</h3>
            <ul>
              <li>Pembelian bersifat final dan tidak dapat dikembalikan</li>
              <li>Anda bertanggung jawab atas penggunaan mod yang sesuai dengan EULA game</li>
              <li>Dilarang menyebarluaskan mod yang dibeli</li>
            </ul>

            <h3>Untuk Penjual:</h3>
            <ul>
              <li>Hanya menjual konten orisinal atau yang memiliki izin distribusi</li>
              <li>Bertanggung jawab atas dukungan produk</li>
              <li>Mematuhi syarat dan ketentuan game yang relevan</li>
            </ul>
          </section>

          <section>
            <h2>4. Hak Kekayaan Intelektual</h2>
            <p>Semua konten di platform WARMOD dilindungi oleh hak cipta. Penjual mempertahankan hak atas mod yang mereka buat.</p>
          </section>

          <section>
            <h2>5. Pembatasan Tanggung Jawab</h2>
            <p>WARMOD tidak bertanggung jawab atas:</p>
            <ul>
              <li>Kerusakan pada game atau sistem</li>
              <li>Kehilangan data</li>
              <li>Konflik dengan developer game</li>
              <li>Kinerja mod individual</li>
            </ul>
          </section>

          <section>
            <h2>6. Perubahan Syarat</h2>
            <p>Kami berhak mengubah syarat layanan kapan saja. Perubahan akan diberitahukan melalui platform.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;