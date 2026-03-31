
export const getAll = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, g.nome AS genero
      FROM plantas p
      LEFT JOIN genero g ON p.id_genero = g.id
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export cont getByID = async (req, res) => {
    try{
        const result = await db.query(
            `SELECT * from plantas WHERE id = $1`
            [id]
        );

        if(result.rows.lenght === 0 ) {
            return res.status(404).json({error: "essa planta não existe"})

        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({error: err.message});
    }

}



export const createPlantEntry = async (req, res) => {
    try {
        const {
            nome_comum,
            id_genero,
            id_usuario,
            descricao,
            imagem_url
        } = req.body;

        const result = await db.query(`
            INSERT INTO plantas
            (nome_comum, id_genero, id_usuario, descricao, imagem_url)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `, [nome_comum, id_genero, id_usuario, descricao, imagem_url]);


        res.status(201).json(result.rows[0]);


    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
