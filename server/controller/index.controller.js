import { pool } from "../db.js "

export const executeQuery = async (req, res) => {
    try {
        const {data} = req.query;
        const [rows, fields] = await pool.query(data);
        console.log(rows);
        res.json(rows);
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
}

export const initializeApp = async (req, res) => {
    try {
        // const [rows, fields] = await pool.query('CREATE TABLE IF NOT EXISTS cliente (id int, name varchar(30))');
        // const [rows2, fields2] = await pool.query('CREATE TABLE IF NOT EXISTS orden (id int, nameorder varchar(30));');
        const [rowsTables] = await pool.query('show tables');

        const [rowsCliente] = await pool.query(`SELECT * FROM ${rowsTables[0].Tables_in_main}`);
        const [rowsOrden] = await pool.query(`SELECT * FROM ${rowsTables[1].Tables_in_main}`);
        console.log(rowsOrden);
        console.log(rowsCliente);
        res.json([rowsCliente, rowsOrden]);
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