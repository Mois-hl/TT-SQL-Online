import { pool } from "../db.js "
import {insertsArray} from "../scripts-db/inserts.js"
import { DB_NAME } from '../config.js'

const dbName = DB_NAME == 'main' ? 'Tables_in_main' : 'Tables_in_railway';

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
        const {data} = req.query;
        if(data){
            const [tableNames] = await pool.query('show tables');
            const tableNamesFiltered = tableNames.filter((item) => item[dbName].includes(data))
            if(tableNamesFiltered.length > 0){
                const commandsToDeleteAllTables = tableNamesFiltered.map((table) => (`DROP TABLE IF EXISTS ${table[dbName]};`))
                const [responseDelete] = await pool.query(commandsToDeleteAllTables.join(' '));
            }
            const [clienteTable] = await pool.query(`CREATE TABLE IF NOT EXISTS ${data}cliente (idCliente INT NOT NULL, nombre VARCHAR(20) NULL, apellido VARCHAR(20) NULL, edad INT NOT NULL, ciudad VARCHAR(30) NULL)`);
            const [ordenTable] = await pool.query(`CREATE TABLE IF NOT EXISTS ${data}orden (idOrden INT NOT NULL,idCliente INT NOT NULL,fecha DATE NOT NULL,monto DECIMAL(10,2) NULL)`);
            const [inserts] = await pool.query(`INSERT INTO ${data}cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (1, 'Juan', 'Pérez', 25, 'Ciudad de México'); INSERT INTO ${data}cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (2, 'Monserrat', 'Ramírez', 30, 'Madrid'); INSERT INTO ${data}cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (3, 'Carlos', 'López', 35, 'Buenos Aires');INSERT INTO ${data}cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (4, 'Ana', 'Rodríguez', 28, 'Lima');INSERT INTO ${data}cliente (idCliente, nombre, apellido, edad, ciudad) VALUES (5, 'Pedro', 'Martínez', 32, 'Santiago');INSERT INTO ${data}orden (idOrden, idCliente, fecha, monto) VALUES (1, 3, '2023-07-18', 1500.00);INSERT INTO ${data}orden (idOrden, idCliente, fecha, monto) VALUES (2, 4, '2023-07-19', 2000.00);INSERT INTO ${data}orden (idOrden, idCliente, fecha, monto) VALUES (3, 1, '2023-07-20', 1500.00);INSERT INTO ${data}orden (idOrden, idCliente, fecha, monto) VALUES (4, 5, '2023-07-21', 1800.00);INSERT INTO ${data}orden (idOrden, idCliente, fecha, monto) VALUES (5, 1, '2023-07-22', 1200.00);`)
            res.json(inserts);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const initializeApp = async (req, res) => {
    try {
        const {data} = req.query;
        if(data){
            const [tableNames] = await pool.query('show tables');
            const tableNamesFiltered = tableNames.filter((item) => item[dbName].includes(data))
            console.log(tableNamesFiltered);
            const totalRows = tableNamesFiltered.map(async (table) => {
                const [response] = await pool.query(`SELECT * FROM ${table[dbName]}`)
                const tableNameAndRows = {name: table[dbName], rows: response}
                return tableNameAndRows;
            })  
            const resolvedPromise =  await Promise.all(totalRows)
            res.json(resolvedPromise)
        }
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