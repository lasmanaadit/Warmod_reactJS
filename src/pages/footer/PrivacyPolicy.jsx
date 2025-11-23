// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\pages\footer\PrivacyPolicy.jsx

import React from 'react';
import '../../styles/footerpages/FooterPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="footer-page">
      <div className="container">
        <div className="footer-page-header">
          <h1>Kebijakan Privasi</h1>
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>
        
        <div className="footer-page-content">
          <section>
            <h2>1. Informasi yang Kami Kumpulkan</h2>
            <p>Kami mengumpulkan informasi berikut dari pengguna WARMOD:</p>
            <ul>
              <li>Informasi pribadi (nama, email, nomor telepon)</li>
              <li>Informasi pembayaran dan transaksi</li>
              <li>Data penggunaan platform</li>
              <li>Informasi toko dan produk untuk seller</li>
            </ul>
          </section>

          <section>
            <h2>2. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul>
              <li>Menyediakan dan mengelola layanan platform</li>
              <li>Memproses transaksi pembelian</li>
              <li>Memberikan dukungan pelanggan</li>
              <li>Mengembangkan dan meningkatkan platform</li>
              <li>Mengirim notifikasi penting</li>
            </ul>
          </section>

          <section>
            <h2>3. Perlindungan Data</h2>
            <p>Kami menerapkan langkah-langkah keamanan yang tepat untuk melindungi data pribadi Anda dari akses, pengungkapan, atau penggunaan yang tidak sah.</p>
          </section>

          <section>
            <h2>4. Berbagi Informasi</h2>
            <p>Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan dalam kondisi berikut:</p>
            <ul>
              <li>Dengan persetujuan Anda</li>
              <li>Untuk mematuhi kewajiban hukum</li>
              <li>Untuk melindungi hak dan properti WARMOD</li>
            </ul>
          </section>

          <section>
            <h2>5. Hak Pengguna</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul>
              <li>Mengakses informasi pribadi Anda</li>
              <li>Memperbaiki informasi yang tidak akurat</li>
              <li>Menghapus informasi pribadi</li>
              <li>Menolak pemrosesan data tertentu</li>
            </ul>
          </section>

          <section>
            <h2>6. Kontak</h2>
            <p>Untuk pertanyaan tentang kebijakan privasi, hubungi: <strong>support@warmod.com</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;