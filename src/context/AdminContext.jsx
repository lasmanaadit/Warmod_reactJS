import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  // Load initial data
  useEffect(() => {
    const initialVerificationRequests = [
      {
        id: 1,
        nama: "Valent Alif",
        pembayaran: "EP3 JETBUS 3",
        driveLink: "https://drive.google.com/drive/folders/abc123def456ghi789",
        status: "pending",
        productDetails: {
          nama: "EP3 JETBUS 3 Mod Package",
          harga: "Rp 150.000",
          deskripsi: "Mod komprehensif untuk game bus simulator dengan fitur lengkap termasuk interior custom, sound system, dan physics upgrade.",
          gambar: ["https://via.placeholder.com/300x200/FF6B6B/white?text=Gambar+1", "https://via.placeholder.com/300x200/4ECDC4/white?text=Gambar+2", "https://via.placeholder.com/300x200/45B7D1/white?text=Gambar+3", "https://via.placeholder.com/300x200/96CEB4/white?text=Gambar+4", "https://via.placeholder.com/300x200/F7DC6F/white?text=Gambar+5"],
          kategori: "Bus Simulator",
          fitur: ["Interior Custom", "Sound System Upgrade", "Physics Improvement", "HD Textures"],
          tanggalUpload: "2024-01-15"
        }
      },
      {
        id: 2,
        nama: "Nanda Andika",
        pembayaran: "CC 206 AIO",
        driveLink: "https://drive.google.com/drive/folders/xyz789abc123def456",
        status: "pending",
        productDetails: {
          nama: "CC 206 All-in-One Mod",
          harga: "Rp 200.000",
          deskripsi: "Mod All-in-One untuk game racing dengan berbagai fitur premium dan kompatibilitas luas.",
          gambar: ["https://via.placeholder.com/300x200/FF6B6B/white?text=Gambar+1", "https://via.placeholder.com/300x200/4ECDC4/white?text=Gambar+2"],
          kategori: "Racing Game",
          fitur: ["All-in-One Package", "High Performance", "Multi-Platform Support"],
          tanggalUpload: "2024-01-16"
        }
      }
    ];

    const initialUsers = [
      { 
        id: 1, 
        nama: "Valent Alif", 
        toko: "YELLOW FLASH STUDIO", 
        status: "active" 
      },
      { 
        id: 2, 
        nama: "Nanda Andika", 
        toko: "SPEED RACER MODS", 
        status: "active" 
      }
    ];

    const initialTransactions = [
        {
          id: 1,
          transactionId: "TRX-001-2024",
          pembeli: {
            nama: "Adi Pratama",
            email: "adi.pratama@email.com",
            telepon: "081234567890"
          },
          penjual: {
            nama: "Valent Alif",
            email: "valent.alif@email.com",
            toko: "YELLOW FLASH STUDIO"
          },
          produk: {
            nama: "EP3 JETBUS 3 Mod Package",
            kategori: "Bus Simulator",
            harga: "Rp 150.000",
            deskripsi: "Mod komprehensif untuk game bus simulator dengan fitur lengkap"
          },
          transaksi: {
            tanggal: "2024-01-15 14:30:00",
            status: "done",
            metodePembayaran: "Transfer Bank BCA",
            kodeUnik: "TRX-001-2024",
            totalBayar: "Rp 150.000"
          }
        },
        {
          id: 2,
          transactionId: "TRX-002-2024",
          pembeli: {
            nama: "Budi Santoso",
            email: "budi.santoso@email.com",
            telepon: "081298765432"
          },
          penjual: {
            nama: "Nanda Andika",
            email: "nanda.andika@email.com",
            toko: "SPEED RACER MODS"
          },
          produk: {
            nama: "CC 206 All-in-One Mod",
            kategori: "Racing Game",
            harga: "Rp 200.000",
            deskripsi: "Mod All-in-One untuk game racing dengan berbagai fitur premium"
          },
          transaksi: {
            tanggal: "2024-01-16 10:15:00",
            status: "failed",
            metodePembayaran: "E-Wallet OVO",
            kodeUnik: "TRX-002-2024",
            totalBayar: "Rp 200.000",
            alasanGagal: "Pembayaran tidak lengkap"
          }
        },
        {
          id: 3,
          transactionId: "TRX-003-2024",
          pembeli: {
            nama: "Citra Lestari",
            email: "citra.lestari@email.com",
            telepon: "081312345678"
          },
          penjual: {
            nama: "Ghopur Santoso",
            email: "ghopur.santoso@email.com",
            toko: "WHEEL KINGDOM"
          },
          produk: {
            nama: "Wheel Pack Ultimate",
            kategori: "Vehicle Customization",
            harga: "Rp 175.000",
            deskripsi: "Koleksi lengkap roda custom untuk berbagai jenis kendaraan"
          },
          transaksi: {
            tanggal: "2024-01-17 16:45:00",
            status: "done",
            metodePembayaran: "Transfer Bank Mandiri",
            kodeUnik: "TRX-003-2024",
            totalBayar: "Rp 175.000"
          }
        },
        {
          id: 4,
          transactionId: "TRX-004-2024",
          pembeli: {
            nama: "Dewi Anggraini",
            email: "dewi.anggraini@email.com",
            telepon: "081409876543"
          },
          penjual: {
            nama: "Reza Fahlevi",
            email: "reza.fahlevi@email.com",
            toko: "MOD MASTER"
          },
          produk: {
            nama: "INNOVA ZENIX Custom Kit",
            kategori: "Car Modification",
            harga: "Rp 250.000",
            deskripsi: "Paket custom lengkap untuk Toyota Innova Zenix"
          },
          transaksi: {
            tanggal: "2024-01-18 09:20:00",
            status: "pending",
            metodePembayaran: "Credit Card",
            kodeUnik: "TRX-004-2024",
            totalBayar: "Rp 250.000"
          }
        },
        {
          id: 5,
          transactionId: "TRX-005-2024",
          pembeli: {
            nama: "Eko Prasetyo",
            email: "eko.prasetyo@email.com",
            telepon: "081511223344"
          },
          penjual: {
            nama: "Valent Alif",
            email: "valent.alif@email.com",
            toko: "YELLOW FLASH STUDIO"
          },
          produk: {
            nama: "BUS SIMULATOR PRO PACK",
            kategori: "Bus Simulator",
            harga: "Rp 300.000",
            deskripsi: "Paket pro untuk bus simulator dengan semua fitur premium"
          },
          transaksi: {
            tanggal: "2024-01-19 13:10:00",
            status: "done",
            metodePembayaran: "Transfer Bank BRI",
            kodeUnik: "TRX-005-2024",
            totalBayar: "Rp 300.000"
          }
        }
      ];

    const initialWithdrawRequests = [
      {
        id: 1,
        userId: 1,
        nama: "YellowFlash",
        nominal: "Rp 902.000",
        rekening: "123456789123456",
        bank: "BCA",
        atasNama: "VALENT ALIF",
        status: "pending",
        tanggalRequest: "2024-01-15 14:30:00",
        email: "valent.alif@email.com",
        saldoSebelum: "Rp 1.250.000",
        saldoSesudah: "Rp 348.000"
      },
      {
        id: 2,
        userId: 2,
        nama: "Nanda Andika",
        nominal: "Rp 40.000",
        rekening: "1234567890123",
        bank: "BRI",
        atasNama: "NANDA ANDIKA PUTRA",
        status: "pending",
        tanggalRequest: "2024-01-15 15:45:00",
        email: "nanda.andika@email.com",
        saldoSebelum: "Rp 85.000",
        saldoSesudah: "Rp 45.000"
      },
      {
        id: 3,
        userId: 3,
        nama: "Ghopur",
        nominal: "Rp 769.000",
        rekening: "1234567890",
        bank: "Mandiri",
        atasNama: "GHOPUR SANTOSO",
        status: "pending",
        tanggalRequest: "2024-01-16 09:20:00",
        email: "ghopur.santoso@email.com",
        saldoSebelum: "Rp 1.000.000",
        saldoSesudah: "Rp 231.000"
      },
      {
        id: 4,
        userId: 4,
        nama: "Reza Fahlevi",
        nominal: "Rp 276.000",
        rekening: "123456789123456",
        bank: "BNI",
        atasNama: "REZA FAHLEVI AKBAR",
        status: "pending",
        tanggalRequest: "2024-01-16 11:15:00",
        email: "reza.fahlevi@email.com",
        saldoSebelum: "Rp 500.000",
        saldoSesudah: "Rp 224.000"
      }
      
    ];

    setVerificationRequests(initialVerificationRequests);
    setUsers(initialUsers);
    setTransactions(initialTransactions);
    setWithdrawRequests(initialWithdrawRequests);
  }, []);

  // Hitung pending approvals
  const getPendingApprovalsCount = () => {
    return verificationRequests.filter(request => request.status === 'pending').length;
  };

  // Hitung pending withdraw requests
  const getPendingWithdrawCount = () => {
    return withdrawRequests.filter(request => request.status === 'pending').length;
  };

  // Hitung total transaksi
  const getTotalTransactions = () => {
    const total = transactions
      .filter(transaction => transaction.status === 'done')
      .reduce((sum, transaction) => {
        const amount = parseInt(transaction.harga.replace(/[^\d]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    return `Rp. ${total.toLocaleString('id-ID')}`;
  };

  // Approve verification request
  const approveVerification = (id) => {
    setVerificationRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  // Decline verification request
  const declineVerification = (id) => {
    setVerificationRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: "declined" } : request
      )
    );
  };

  // Approve withdraw request
  const approveWithdraw = (id) => {
    setWithdrawRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  // Decline withdraw request
  const declineWithdraw = (id) => {
    setWithdrawRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: "declined" } : request
      )
    );
  };

  // Suspend user
  const suspendUser = (id) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status: "suspended" } : user
      )
    );
  };

  // Unsuspend user
  const unsuspendUser = (id) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status: "active" } : user
      )
    );
  };

  const value = {
    verificationRequests,
    users,
    transactions,
    withdrawRequests,
    getPendingApprovalsCount,
    getPendingWithdrawCount,
    getTotalTransactions,
    approveVerification,
    declineVerification,
    approveWithdraw,
    declineWithdraw,
    suspendUser,
    unsuspendUser
  };


  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};