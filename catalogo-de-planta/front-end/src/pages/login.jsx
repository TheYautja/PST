import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/login.css";

export default function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  async function handleLogin(e) { // tá filtrando a senha no front, ver dps
    e.preventDefault();


    //tava aq o problema, nem chegava no codigo do back, logava antes
    //login({ name: "Usuário Teste", email: form.email });
    //alert("Login realizado");
    //navigate("/");

    //O que tinha antes, comentado pra não travar o front sem o backend ligado
    
    try {
      const res = await fetch("http://localhost:3000/users" );

      if (!res.ok) {
        throw new Error("erro na resposta do back :O)");
      }

      const users = await res.json();

      const user = users.find(
        (u) => u.email === form.email && u.senha === form.senha
      );

      if (user) {
        login(user); // Se achar o usuário real, loga com os dados dele
        navigate("/");
      } else {
        alert("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao conectar com backend:", error);
    }

  }

  return (
 <div className="box">

    <button onClick={() => navigate(-1)} className="btnVoltar">
        ← 
    </button>
  <div className="login-container">
    <div className="login-box">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      <div className="login-footer">
        <p>Não tem uma conta?</p>
        <Link to="/register">Cadastre-se</Link>
      </div>
    </div>
  </div>
  </div>
);
}
