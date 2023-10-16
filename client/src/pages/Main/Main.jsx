import { useEffect, useState } from 'react'
import './Main.css'
import { executeQuery, initializeApp } from '../../api/api.js'
import { v4 as uuidv4 } from 'uuid';
import Table from '../../components/Table/Table.jsx'
import Message from '../../components/Message/Message.jsx'
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoMdSend } from 'react-icons/io';
import FormQuery from '../../components/FormQuery/FormQuery';
import { useMainContext } from '../../context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main() {

  const [query, setQuery] = useState('SELECT id, nombre, edad FROM cliente')

  const [rows, setRows] = useState([])

  const [rowsInit, setRowsInit] = useState([])

  const [message, setMessage] = useState({});

  const [loading, setLoading] = useState(false);

  const { showSaveQuery, showNav, setShowNav } = useMainContext()

  // const [uuid, setUuid] = useState(uuidv4().replaceAll('-', ''))

  // const id = crypto.randomUUID()

  useEffect(() => {
    setShowNav(false)
    const init = async () => {
      const response = await initializeApp();
      // console.log(response);
      if (Array.isArray(response.data))
        if (!response.data.length == 0)
          setRowsInit(response.data);
    }
    init();
  }, [])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRows([]);
    setMessage({});
    const response = await executeQuery(query);
    // console.log(response);
    if (Array.isArray(response.data)) {
      if (!response.data.length == 0) {
        setRows(response.data)
        setRowsInit([...rowsInit, response.data])
      } else {
        setMessage({ data: 'No hay resultados para la consulta', error: false })
      }
    } else {
      if (response.message) {
        setMessage({ data: response.message, error: true })
      } else if (response.data.affectedRows >= 0) {
        if (response.data.affectedRows == 1) {
          setMessage({ data: `${response.data.affectedRows} fila fue afectada`, error: false })
        } else {
          setMessage({ data: `${response.data.affectedRows} filas fueron afectadas`, error: false })
        }
      }
    }
    setLoading(false);
  }

  return (
    <>
      <header>
        <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
      </header>
      <NavBar show={showNav} />
      <ToastContainer theme="colored" autoClose={2000} />
      {showSaveQuery && <FormQuery textAreaQuery={query} />}
      <div className={showSaveQuery ? 'layout-main-page' : 'layout-main-page active'} onClick={() => setShowNav(false)}>
        <div>
          <form className='form-query' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px', color: '#fff' }}>
              <label>Input</label>
              <div>
                <button className='button-clear' type='button' onClick={() => setQuery('')} ><div style={{ display: 'flex', gap: '4px' }} ><FaRegTrashCan /> <p>Limpiar</p></div></button>
                <button className='button-send' type='submit' ><div style={{ display: 'flex', gap: '4px' }} ><IoMdSend /> <p>Enviar</p></div></button>
                {/* <button className='button-send' type='button' onClick={handleSaveQuery}>Save ❤️</button> */}
              </div>
            </div>
            <textarea spellCheck="false" className='textarea-query' value={query} onChange={(handleChange)}></textarea>
          </form>
          <div style={{ color: '#fff', marginBottom: '10px' }}>
            <label>Output</label>
          </div>
          {
            !rows.length == 0 && <Table rows={rows} />
          }
          {
            !Object.keys(message).length == 0 && <Message message={message}></Message>
          }
          {
            loading && <h2 style={{ color: '#fff', fontSize: '20px' }}>loading...</h2>
          }
        </div>
        <div className='default-tables'>
          {
            !rowsInit.length == 0 && rowsInit.map((item, index) => (
              <Table key={index} rows={rowsInit[index]} />
            ))
          }
        </div>
      </div>
    </>
  )
}