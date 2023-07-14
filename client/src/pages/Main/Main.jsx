import { useEffect, useState } from 'react'
import './Main.css'
import { executeQuery } from '../../api/api.js'
import { v4 as uuidv4 } from 'uuid';
import Table from '../../components/Table/Table.jsx'

export default function Main () {
  
  const [query, setQuery] = useState('SELECT id, name FROM cliente')
  
  const [rows, setRows] = useState([])

  const [message, setMessage] = useState({});

  const [uuid, setUuid] = useState(uuidv4().replaceAll('-', ''))
  
  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRows([])
    setMessage({})
    const response = await executeQuery(query);
    console.log(response);
    if(Array.isArray(response.data)){
      if(!response.data.length == 0){
        setRows(response.data)
      }else{
        setMessage({data: 'No hay resultados para la consulta', error: false})
      }
    }else{
      if(response.message){
        setMessage({data: response.message, error: true})
      }else if(response.data.affectedRows){
        setMessage({data: `${response.data.affectedRows} filas fueron afectadas`, error: false})
      }
    }
  }

  const renderTable = () => {
    if(!rows.length == 0){
      return <Table rows={rows} />
    }
  }

  return(
    <div className='layout-main-page'>
      <div>
        <form className='form-query' onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px', color: '#fff' }}>
            <label>Input</label>
            <button className='button-query' type='submit'>Send</button>
          </div>
          <textarea spellcheck="false" className='textarea-query' value={query} onChange={(handleChange)}></textarea>
        </form>
        {
        renderTable()
        }
        {
          !Object.keys(message).length == 0 && <div style={{ background: '#fff', borderRadius: '10px', padding: '13px' }}>
            <span style={{ color: '#ff0000' }}>SQL-Error: </span><h5>{message.data}</h5>
          </div>
        }
      </div>
      <div className='default-tables'>
        {
          renderTable()
        }
        {
          renderTable()
        }
      </div>
    </div>
  )
}