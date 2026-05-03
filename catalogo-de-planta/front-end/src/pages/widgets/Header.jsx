import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import "../../App.css"
import logo from "../../assets/images/logo (3).png";
import userIcon from "../../assets/images/userIcon.png"

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

        return (
        <header>
          <img src={logo} alt="logo" className="logo"/>

          <div className="linksNav">
            <Link to='/'>Principal</Link>
            <Link to='/maps'>Mapa</Link>
            <Link to='/catalogo'>Catálogo</Link>
          </div>

          <div className="userSection">
            <img 
              src={userIcon} 
              className="userIcon"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            
            {menuOpen && (
              <div className="userDropdown">
                {!isLoggedIn ? (
                  <Link to='/login' style={{ textDecoration: 'none', display: 'block' }}>
                    <p style={{ borderBottom: 'none', color: '#333', cursor: 'pointer' }}>
                      Fazer Login
                    </p>
                  </Link>
                ) : (
                  <>
                    <p>Olá, {user?.nome}!</p>
                    <button onClick={logout}>Sair</button>
                  </>
                )}
              </div>
            )}
          </div>
    </header>
  );
}