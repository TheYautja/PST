import Header from "./pages/widgets/Header";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <div>
        <Header/>
        <main>
          <h1> Seja bem vindo ao Plantarium! </h1>
          <p>Deixe registradas aqui as plantas que conhece e conheça as que tem ao seu redor</p>

          <div id="botoes-inicial">
            <button><Link to='/maps'>Mapa</Link></button>
            <button><Link to='/catalogo'>Catálogo</Link></button>
          </div>
        </main>
        <footer></footer>
      </div>
  );
}

export default App;