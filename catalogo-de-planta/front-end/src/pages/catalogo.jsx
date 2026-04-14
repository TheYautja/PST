import Header from "./widgets/Header";
import Catalogado from "./widgets/Catalogado";
import '../assets/styles/catalogo.css';

import { useState } from "react";

export default function Catalogo() {

   const [filtro, setFiltro] = useState('');

   function manusearMudancaFiltro(e) {
      setFiltro(e.target.value)
   }

   // * Para cada planta carregada, tem q chamar a função Catalogado
   function carregarPlantas() {
      // ! Temporário, REMOVER
      const plantas = [
         {
            nome: 'ola',
            key: 1
         },
         {
            nome: 'denovo',
            key: 2
         }, {nome: 'ola', key: 3}, {nome: 'ola', key: 4}, {nome: 'ola', key: 5}   
      ]

      return(
         <div className="catalogoPlantas">
            {
               // plantas.map(element => Catalogado(element) )

               plantas.filter(element => element.nome.toLowerCase().includes(filtro.toLowerCase()))
               .map(element => Catalogado(element) )
            }
         </div>
         
      )
   }


   return (
      <div>
         <Header />
         <main>

            <h1>Catálogo de plantas - Cidade</h1>

            <div id="pesquisa">
               <p>Foto</p>
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