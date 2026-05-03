import db from '../db.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM usuarios`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT * FROM usuarios WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nome, email, cep, senha } = req.body;

    const result = await db.query(
      `INSERT INTO usuarios (nome, email, cep, senha)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, email, cep, senha]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, cep, senha } = req.body;

    const result = await db.query(
      `UPDATE usuarios
       SET nome = $1, email = $2, cep = $3, senha = $4
       WHERE id = $5
       RETURNING *`,
      [nome, email, cep, senha, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(`DELETE FROM usuarios WHERE id = $1`, [id]);

    res.json({ message: "Usuário deletado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const validateUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ valid: false, error: "Email e senha são obrigatórios" });
    }

    const result = await db.query(
      `SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
      [email, senha]
    );

    if (result.rows.length > 0) {
      res.json({ valid: true, user: result.rows[0] });
    } else {
      res.status(401).json({ valid: false, error: "Email ou senha incorretos" });
    }
  } catch (err) {
    res.status(500).json({ valid: false, error: err.message });
  }
};
