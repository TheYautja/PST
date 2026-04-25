import Header from "./widgets/Header";
import Catalogado from "./widgets/Catalogado";
import '../assets/styles/catalogo.css';
import { Link } from "react-router-dom";
import axios from 'axios';

import { useState, useEffect } from "react";

export default function Catalogo() {
   const [filtro, setFiltro] = useState('');
   const [plantas, setPlantas] = useState([]);

   useEffect(() => {
      async function fetchPlantas() {
         try {
            const response = await axios.get('http://localhost:8000/plants');
            const semValoresNulos = response.data.filter(element => element.nome_comum != null);
            setPlantas(semValoresNulos);
         } catch (error) {
            console.error('Erro:', error);
         }
      }
      fetchPlantas();
   }, []);

   function manusearMudancaFiltro(e) {
      setFiltro(e.target.value)
   }

   // * Para cada planta carregada, tem q chamar a função Catalogado
   function carregarPlantas() {
      return(
         <div className="catalogoPlantas">
            {
               plantas.filter(element => element.nome_comum.toLowerCase().includes(filtro.toLowerCase()))
               .map(element => Catalogado(element))
            }
         </div>
      )
   }

   return (
      <div>
         <Header />
         <main>
            <h1>Catálogo de plantas - Cidade</h1>

            <Link to={"/cadastrar-planta"} className="add.btn">+</Link>

            <div id="pesquisa">
               <p>🔍</p>
               <input type="text" id="pesquisa" value={filtro} onChange={manusearMudancaFiltro} />
            </div>

            <section>
               {carregarPlantas()}
            </section>

            <div className="proximaPagina">
               <p> {"< 00 | 00 >"}  </p>
            </div>

         </main>
         <footer></footer>
      </div>
   )
}