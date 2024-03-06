import { pool } from "../db.js "
import {insertsArray} from "../scripts-db/inserts.js"
import { DB_NAME } from '../config.js'

const dbName = DB_NAME == 'main' ? 'Tables_in_main' : 'Tables_in_railway';

//TEST COMMIT

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