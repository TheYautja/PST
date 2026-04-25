import { Link } from "react-router-dom"

export default function Header() {


        return (
<header>
          <p>Logo</p>

          <div>
            <Link to='/'>Principal</Link>
            <Link to='/maps'>Mapa</Link>
            <Link to='/catalogo'>Catálogo</Link>
          </div>

          <Link to='/login'></Link>
        </header>
        )
}