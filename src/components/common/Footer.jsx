import { Link } from 'react-router-dom';
import { FaGamepad, FaHome, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>Contact</h3>
                    <ul class="footer-links">
                        <li><a href="#">Email: support@warmod.com</a></li>
                        <li><a href="#">WhatsApp: +62 812-3456-7890</a></li>
                        <li><a href="#">Telegram: @warmod_support</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Syarat & Ketentuan</h3>
                    <ul class="footer-links">
                        <li><a href="#">Kebijakan Privasi</a></li>
                        <li><a href="#">Syarat Layanan</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>Pertanyaan Umum</h3>
                    <ul class="footer-links">
                        <li><a href="#">Cara Pembelian</a></li>
                        <li><a href="#">Cara Install Addon</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3>WARMOD</h3>
                    <ul class="footer-links">
                        <li><a href="#">Tentang Kami</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="copyright">
                © 2025 WARMOD. All rights reserved.
            </div>
        </div>
    </footer>
  );
};

export default Header;