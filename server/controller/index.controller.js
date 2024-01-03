import { pool } from "../db.js "
import {insertsArray} from "../scripts-db/inserts.js"

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

export const resetApp = async (req, res) => {
    try {
        const [tableNames] = await pool.query('show tables');
        if(tableNames.length > 0){
            const commandsToDeleteAllTables = tableNames.map((table) => (`DROP TABLE IF EXISTS ${table.Tables_in_main};`))
            const [responseDelete] = await pool.query(commandsToDeleteAllTables.join(' '));
        }
        const [clienteTable] = await pool.query("CREATE TABLE IF NOT EXISTS cliente (idCliente INT NOT NULL, nombre VARCHAR(20) NULL, apellido VARCHAR(20) NULL, edad INT NOT NULL, ciudad VARCHAR(30) NULL)");
        const [ordenTable] = await pool.query("CREATE TABLE IF NOT EXISTS orden (idOrden INT NOT NULL,idCliente INT NOT NULL,fecha DATE NOT NULL,monto DECIMAL(10,2) NULL)");
        const [inserts] = await pool.query(insertsArray)
        res.json(inserts);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const initializeApp = async (req, res) => {
    try {
        const [tableNames] = await pool.query('show tables');
        const totalRows = tableNames.map(async (table) => {
            const [response] = await pool.query(`SELECT * FROM ${table.Tables_in_main}`)
            const tableNameAndRows = {name: table.Tables_in_main, rows: response}
            return tableNameAndRows;
        })  
        const resolvedPromise =  await Promise.all(totalRows)
        res.json(resolvedPromise)
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