// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\pages\footer\HowToInstall.jsx

import React, { useState } from 'react';
import '../../styles/footerpages/FooterPages.css';

const HowToInstall = () => {
  const [activeGame, setActiveGame] = useState('bus-simulator');

  const installationGuides = {
    'bus-simulator': {
      title: 'Bus Simulator Indonesia (BUSSID)',
      steps: [
        'Download file mod yang telah dibeli',
        'Ekstrak file ZIP menggunakan aplikasi seperti WinRAR atau ZArchiver',
        'Copy folder hasil ekstrak ke: Android > data > com.maleo.bussid > files > Mods',
        'Jika folder Mods tidak ada, buat folder baru dengan nama "Mods"',
        'Buka game BUSSID dan mod sudah tersedia di garage',
        'Untuk skin bus, paste file di folder "Skin"'
      ],
      notes: [
        'Pastikan game versi terbaru',
        'Backup data sebelum install mod',
        'Beberapa mod memerlukan bus tertentu'
      ]
    },
    'trainz': {
      title: 'Trainz Simulator',
      steps: [
        'Download file mod dari WARMOD',
        'Buka Trainz Content Manager',
        'Klik File > Import CDP',
        'Pilih file mod yang telah didownload',
        'Tunggu proses import selesai',
        'Commit assets yang diimport',
        'Mod siap digunakan di game'
      ],
      notes: [
        'Pastikan Trainz Content Manager terbuka',
        'Periksa dependencies jika ada error',
        'Restart game jika mod tidak muncul'
      ]
    },
    'ets': {
      title: 'Euro Truck Simulator 2',
      steps: [
        'Download file mod (biasanya format .scs atau .zip)',
        'Copy file mod ke folder: Documents > Euro Truck Simulator 2 > mod',
        'Buka game ETS2',
        'Pergi ke Profile > Mod Manager',
        'Aktifkan mod yang diinginkan',
        'Atur load order jika diperlukan',
        'Jalankan game dan mod sudah aktif'
      ],
      notes: [
        'Beberapa mod tidak kompatibel satu sama lain',
        'Perhatikan versi game dan kompatibilitas mod',
        'Backup save game sebelum install mod baru'
      ]
    },
    'ats': {
      title: 'American Truck Simulator',
      steps: [
        'Download file mod dari WARMOD',
        'Place file mod di: Documents > American Truck Simulator > mod',
        'Buka game ATS',
        'Masuk ke Mod Manager dari menu utama',
        'Aktifkan mod dengan mencentangnya',
        'Atur urutan loading mod yang tepat',
        'Apply changes dan mainkan game'
      ],
      notes: [
        'Mod truck biasanya perlu diaktifkan di dealer',
        'Perhatikan compatibility dengan DLC',
        'Deactivate mod sebelum update game'
      ]
    }
  };

  return (
    <div className="footer-page">
      <div className="container">
        <div className="footer-page-header">
          <h1>Cara Install Addon</h1>
          <p>Panduan instalasi mod untuk berbagai game</p>
        </div>
        
        <div className="footer-page-content">
          <div className="game-selector">
            <h3>Pilih Game:</h3>
            <div className="game-buttons">
              <button 
                className={activeGame === 'bus-simulator' ? 'active' : ''}
                onClick={() => setActiveGame('bus-simulator')}
              >
                BUSSID
              </button>
              <button 
                className={activeGame === 'trainz' ? 'active' : ''}
                onClick={() => setActiveGame('trainz')}
              >
                Trainz
              </button>
              <button 
                className={activeGame === 'ets' ? 'active' : ''}
                onClick={() => setActiveGame('ets')}
              >
                ETS 2
              </button>
              <button 
                className={activeGame === 'ats' ? 'active' : ''}
                onClick={() => setActiveGame('ats')}
              >
                ATS
              </button>
            </div>
          </div>

          <div className="installation-guide">
            <h2>{installationGuides[activeGame].title}</h2>
            
            <div className="steps-container">
              {installationGuides[activeGame].steps.map((step, index) => (
                <div key={index} className="step">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="notes-section">
              <h3>Catatan Penting:</h3>
              <ul>
                {installationGuides[activeGame].notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <section className="troubleshooting">
            <h2>Pemecahan Masalah</h2>
            <div className="troubleshooting-grid">
              <div className="issue">
                <h4>Mod Tidak Muncul</h4>
                <p>Pastikan file ditempatkan di folder yang benar dan format file sesuai</p>
              </div>
              <div className="issue">
                <h4>Game Crash</h4>
                <p>Nonaktifkan mod satu per satu untuk menemukan yang bermasalah</p>
              </div>
              <div className="issue">
                <h4>Texture Hilang</h4>
                <p>Periksa requirements mod dan pastikan semua dependencies terpenuhi</p>
              </div>
              <div className="issue">
                <h4>Performance Drop</h4>
                <p>Beberapa mod berat dapat mempengaruhi performance, sesuaikan dengan spesifikasi PC</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToInstall;