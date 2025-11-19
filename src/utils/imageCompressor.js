// src/utils/imageCompressor.js
export const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // Calculate new dimensions
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob(
            (blob) => {
              const compressedReader = new FileReader();
              compressedReader.onload = (e) => resolve(e.target.result);
              compressedReader.readAsDataURL(blob);
            },
            'image/jpeg',
            quality
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };
  
  export const clearOldMods = () => {
    const mods = JSON.parse(localStorage.getItem('mods') || '[]');
    // Keep only last 10 mods to prevent quota issues
    if (mods.length > 10) {
      const recentMods = mods.slice(-10);
      localStorage.setItem('mods', JSON.stringify(recentMods));
    }
  };