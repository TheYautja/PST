import db from '../db.js';

export const createMarker = async (req, res) => {
  try {
    const { id_planta, latitude, longitude } = req.body;

    const result = await db.query(`
      INSERT INTO marcadores (id_planta, latitude, longitude)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [id_planta, latitude, longitude]);

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMarkersByPlant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(`
      SELECT * FROM marcadores WHERE id_planta = $1
    `, [id]);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
