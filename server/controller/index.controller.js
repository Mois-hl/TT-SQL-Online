import { pool } from "../db.js "

export const executeQuery = async (req, res) => {
    try {
        const {data} = req.query;
        const [rows, fields] = await pool.query(data);
        console.log(rows);
        console.log(fields);
        res.json(rows);
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
}

export const initializeApp = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('CREATE TABLE IF NOT EXISTS cliente (id int, name varchar(30))');
        const [rows2, fields2] = await pool.query('CREATE TABLE IF NOT EXISTS orden (id int, nameorder varchar(30));');
        const [rows3, fields3] = await pool.query('SELECT * FROM cliente')
        console.log(rows);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const finishApp = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('DROP TABLE IF EXISTS cliente');
        console.log(rows);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}