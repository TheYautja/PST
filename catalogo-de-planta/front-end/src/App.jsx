import Header from "./pages/widgets/Header";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
        <Header/>
        <main className="principalPag">
          <h1> Seja bem vindo ao Plantarium! </h1>
          <p>Deixe registradas aqui as plantas que conhece e conheça as que tem ao seu redor</p>

          <div id="botoes-inicial">
            <button><Link to='/maps'>Mapa</Link></button>
            <button><Link to='/catalogo'>Catálogo</Link></button>
            {!isLoggedIn && (
              <button><Link to='/login'>Login</Link></button>
              )}
            {isLoggedIn && (
                <button><Link to='/cadastrar-planta'>Cadastrar Planta</Link></button>
              )}
          </div>
        </main>
        <footer></footer>
      </div>
  );
}

export default App;
