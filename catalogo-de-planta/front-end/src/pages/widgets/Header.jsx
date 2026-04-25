import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"; // ← ADICIONAR

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

        return (
        <header>
          <p>Logo</p>

          <div>
            <Link to='/'>Principal</Link>
            <Link to='/maps'>Mapa</Link>
            <Link to='/catalogo'>Catálogo</Link>
          </div>

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