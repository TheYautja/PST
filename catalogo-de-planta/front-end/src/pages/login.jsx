import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    const user = users.find(
      (u) => u.email === form.email && u.senha === form.senha
    );

    if (user) {
      alert("Login OK");
    } else {
      alert("Usuário não encontrado");
    }
  }

  return (
  <div>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Senha"
        value={form.senha}
        onChange={(e) => setForm({ ...form, senha: e.target.value })}
      />

      <button type="submit">Entrar</button>
    </form>
    <div>
        <p>Não tem uma conta?</p>
        <Link to='/register'>Cadastre-se</Link>
    </div>
    </div>
  );
}
