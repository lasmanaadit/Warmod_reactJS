// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\pages\footer\AboutUs.jsx

import React from 'react';
import '../../styles/footerpages/FooterPages.css';

// Import foto tim dari folder footer
import teamPhoto from './team-photo.jpg';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Lasmana Adiyatma Prafia',
      role: 'Front end dan Desainer UI/UX',
      bio: 'Bertanggung jawab atas Desain UI/UX dan front end warmod serta bertanggung jawab untuk pengembangan front end pada framwork React.js pada sistem WARMOD'
    },
    {
      name: 'Nanda Handika',
      role: 'Back End', 
      bio: 'Mengembangkan API dan Endpoint serta mengelola database Web Warmod'
    },
    {
      name: 'Atmaka Yanuar Martha',
      role: 'Front End',
      bio: 'Bertanggung jawab untuk membuat tampilan Front end dari halaman Admin dan Seller'
    },
    {
      name: 'Siti jahro Afiah',
      role: 'Project Manager',
      bio: 'Bertanggung jawab untuk mengarahkan Project Warmods serta menyusun laporan dan prototype pada desain UI/UX pada Project ini'
    }
  ];

  return (
    <div className="footer-page">
      <div className="container">
        <div className="footer-page-header">
          <h1>Tentang WARMOD</h1>
          <p>Platform marketplace mod game terdepan di Indonesia</p>
        </div>
        
        <div className="footer-page-content">
          <section className="about-hero">
            <h2>Visi Kami</h2>
            <p>Menjadi platform terkemuka yang menghubungkan kreator mod dengan komunitas gaming Indonesia, menyediakan akses mudah dan aman terhadap konten mod berkualitas.</p>
          </section>

          {/* SECTION: TEAM PHOTO */}
          <section className="team-photo-section">
            <div className="team-photo-container">
              <img 
                src={teamPhoto} 
                alt="Tim WARMOD sedang bekerja sama dalam pengembangan platform" 
                className="team-main-photo"
              />
              <div className="team-photo-overlay">
                <h3>Tim WARMOD</h3>
                <p>Bekerja sama menciptakan platform terbaik untuk komunitas gaming Indonesia</p>
              </div>
            </div>
          </section>

          <section className="history-section">
            <h2>Latar Belakang</h2>
            <p>WARMOD lahir dari observasi terhadap berkembangnya komunitas modding di Indonesia yang seringkali kesulitan menemukan platform yang terpercaya untuk berjual-beli mod game. Banyak kreator berbakat yang kesulitan memonetisasi karya mereka, sementara pemain game sulit menemukan mod berkualitas dengan support yang baik.</p>
            
            <p>Diluncurkan pada tahun 2024, WARMOD hadir sebagai solusi untuk mempertemukan kedua pihak tersebut dalam ekosistem yang aman, terorganisir, dan menguntungkan semua pihak.</p>
          </section>

          <section className="mission-section">
            <h2>Misi Kami</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <h3>🤝 Memberdayakan Kreator</h3>
                <p>Memberikan platform bagi kreator mod untuk menghasilkan pendapatan dari karya mereka dengan sistem yang fair dan transparan</p>
              </div>
              <div className="mission-card">
                <h3>🎮 Memperkaya Pengalaman Gaming</h3>
                <p>Menyediakan akses mudah dan aman ke mod berkualitas untuk seluruh komunitas gaming Indonesia</p>
              </div>
              <div className="mission-card">
                <h3>🛡️ Keamanan & Kepercayaan</h3>
                <p>Menjaga setiap transaksi dengan sistem keamanan terbaik dan melindungi hak kekayaan intelektual kreator</p>
              </div>
              <div className="mission-card">
                <h3>🚀 Inovasi Berkelanjutan</h3>
                <p>Terus berinovasi dengan fitur-fitur terbaru untuk memenuhi kebutuhan komunitas yang terus berkembang</p>
              </div>
            </div>
          </section>

          <section className="team-section">
            <h2>Tim Pengembang</h2>
            <p className="team-description">
              Dibangun oleh tim yang passionate tentang gaming dan teknologi, WARMOD dikembangkan dengan dedikasi tinggi untuk memberikan pengalaman terbaik bagi seluruh pengguna.
            </p>
            <div className="team-grid-simple">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card-simple">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tech-stack">
            <h2>Teknologi yang Digunakan</h2>
            <p>WARMOD dibangun dengan stack teknologi modern untuk memastikan performa optimal, keamanan tinggi, dan pengalaman pengguna yang mulus:</p>
            <div className="tech-list">
              <span className="tech-item">React.js</span>
              <span className="tech-item">Express.js</span>
              <span className="tech-item">MySQL</span>
              <span className="tech-item">Figma</span>
            </div>
          </section>

          <section className="contact-info">
            <h2>Hubungi Kami</h2>
            <p>Kami selalu siap membantu dan mendengarkan masukan dari komunitas:</p>
            <div className="contact-grid">
              <div className="contact-item">
                <strong>📧 Email</strong>
                <p>support@warmod.com</p>
              </div>
              <div className="contact-item">
                <strong>💬 WhatsApp</strong>
                <p>+62 812-3456-7890</p>
              </div>
              <div className="contact-item">
                <strong>🕐 Jam Operasional</strong>
                <p>Senin - Minggu<br />09:00 - 18:00 WIB</p>
              </div>
              <div className="contact-item">
                <strong>📍 Lokasi</strong>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;