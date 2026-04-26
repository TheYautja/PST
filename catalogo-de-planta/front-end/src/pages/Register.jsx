import { useState } from "react";
import Header from "./widgets/Header";
import "../assets/styles/cadastro.css";

export default function Register() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        profissao: "",
        cidade: "",
        senha: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5432/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
        
            if (!res.ok) throw new Error("Erro ao cadastrar"),

            alert("Usuário criado!");

            setForm({nome: "", email: "", profissao: "", cidade:"", senha: ""});
        } catch (err) {
            console.error(err);
        }}

        return (
            <div className="box">
              <div className="register-container">
                <div className="register-box">
                <h1>Cadastro</h1>

                <form onSubmit={handleSubmit}>

                    <input
                    type="text"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />

                    <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                    type="text"
                    placeholder="Profissão"
                    value={form.profissao}
                    onChange={(e) => setForm({ ...form, profissao: e.target.value })}
                    />

                    <input
                    type="text"
                    placeholder="Cidade"
                    value={form.cidade}
                    onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                    />

                    <input
                    type="password"
                    placeholder="Senha"
                    value={form.senha}
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />

                    <button type="submit">Cadastrar</button>
                </form>
                </div>
            </div>
        </div>
        )
    }
