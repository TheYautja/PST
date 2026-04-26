import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"; // ← ADICIONAR
import "../../App.css"
import logo from "../../assets/images/logo (3).png";
import userIcon from "../../assets/images/userIcon.png"

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

        return (
        <header>
          <img src={logo} alt="logo" className="logo"/>

          <div className="linksNav">
            <Link to='/'>Principal</Link>
            <Link to='/maps'>Mapa</Link>
            <Link to='/catalogo'>Catálogo</Link>
          </div>

          <Link to={"/login"}><img src={userIcon} className="userIcon"/></Link>

          {!isLoggedIn ? (
            <Link to='/login'></Link>
          ) : (
            <div>
          <span>Olá, {user?.name}!</span>
          <button onClick={logout}>Sair</button>
        </div>
      )}
    </header>
  );
}