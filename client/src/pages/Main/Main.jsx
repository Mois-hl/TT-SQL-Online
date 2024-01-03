import { useEffect, useState } from 'react'
import './Main.css'
import { executeQuery, initializeApp, resetApp } from '../../api/api.js'
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
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function Main() {

  // const [query, setQuery] = useState('<span class="mark-keyword">SELECT</span> idCliente, nombre, edad <span class="mark-keyword">FROM</span> cliente;')
  const [query, setQuery] = useState('SELECT idCliente, nombre, edad FROM cliente')

  const [rows, setRows] = useState([])

  const [rowsInit, setRowsInit] = useState([])

  const [message, setMessage] = useState({});

  const [loading, setLoading] = useState(false);

  const { showSaveQuery, showNav, setShowNav, setStatementFromGuidePage, statementFromGuidePage } = useMainContext()

  const [rowsSaveResponse, setRowsSaveResponse] = useState([])

  const [uuid, setUuid] = useState(`t${uuidv4().replaceAll('-', '')}`)

  const [tables, setTables] = useState([])

  // const id = crypto.randomUUID()

  useEffect(() => {
    setShowNav(false)
    if(statementFromGuidePage){
      setStatementFromGuidePage(null)
      setQuery(statementFromGuidePage)
    }
    const init = async () => {
      const responseReset = await resetApp(uuid);
      const response = await initializeApp(uuid);
      // console.log(response);
      if (Array.isArray(response.data))
        if (response.data.length > 0){
          setRowsInit(response.data);
        }
    }
    init();
  }, [])

  //  const handleChange = (event) => {
  //   const value = event.target.value;
  //   // Lista de palabras clave que quieres resaltar
  //   const keywords = ['select ', 'from', 'order', 'by', 'where', 'insert', 'table', 'create', 'asc', 'desc', ' as '];
  //   // Expresión regular para buscar las palabras clave
  //   const regexKeywords = new RegExp(keywords.join('|'), 'gi');
  //   // Reemplaza las palabras clave con un span de estilo
  //   var htmlCode = value.replace(regexKeywords, (match) => `<span class="mark-keyword">${match}</span>`);
  //   // Actualiza el estado con el nuevo contenido resaltado
  //   const regexDigit = /\d+/g;
  //   htmlCode = htmlCode.replace(regexDigit, (match) => `<span class="mark-digit">${match}</span>`);
  //   // Actualiza el estado con el nuevo contenido resaltado
  //   // const regexOperators = / \W+ /g;
  //   // htmlCode = htmlCode.replace(regexOperators, (match) => `<span class="mark-operator">${match}</span>`);

  //   setQuery(htmlCode)
  // }

   const handleExecuteQuery = async () => {
    const tables = rowsInit.map((tables) => (` ${tables.name.replace(uuid, '')}`))
    const regexTables = new RegExp(tables.join('|'), 'gi');
    var newStatement = query.replace(regexTables, (match) => ` ${uuid}${match.substring(1, match.length)}`);
    console.log(newStatement);
    const response = await executeQuery(newStatement);
    return response;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRows([]);
    setMessage({});
    if (query.toUpperCase().includes('SHOW TABLES') || query.toUpperCase().includes('DATABASES') || query.toUpperCase().includes('DATABASE') || query.toUpperCase().includes('USE')) {
      setMessage({ data: 'Sentencia no permitida.', error: true })
    } else {
      const response = await handleExecuteQuery();
      if (Array.isArray(response.data)) {
        if (!response.data.length == 0) {
          setRows(response.data)
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
        if (query.toUpperCase().includes('INSERT') || query.toUpperCase().includes('UPDATE') || query.toUpperCase().includes('ALTER') || query.toUpperCase().includes('DELETE') || query.toUpperCase().includes('DROP')) {
          const responseRefreshTables = await initializeApp(uuid);
          if (Array.isArray(responseRefreshTables.data))
            if (!responseRefreshTables.data.length == 0)
              setRowsInit(responseRefreshTables.data);
        }
      }
    }
    setLoading(false);
  }

  const handleSaveResponse = () => {
    setRowsSaveResponse([rows, ...rowsSaveResponse])
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
            <textarea placeholder='Ingresa una sentencia SQL...' spellCheck="false" className='textarea-query' value={query} onChange={(e) => setQuery(e.target.value)} />
            {/* <div className='htmlCodeContainer'>
              <textarea spellCheck="false" className='textarea-query-code' value={query.replace(/<[^>]*>?/gm, '')} onChange={handleChange} />
              <div className='codeHtmlQuery' dangerouslySetInnerHTML={{__html: query}} />
            </div> */}
            {/* <CodeEditor
              value={query}
              language="sql"
              placeholder="Ingresa una sentencia SQL"
              onChange={(evn) => setQuery(evn.target.value)}
              style={{
                fontSize: 16,
                backgroundColor: "#f5f5f5",
                fontFamily: 'consolas',
                borderRadius: '10px',
                minHeight: '200px',
                marginBottom: '10px'}}
            /> */}
          </form>
          <div style={{ color: '#fff', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <label>Output</label>
            { !rows.length == 0 && <button className='button-saveresponse' onClick={handleSaveResponse}>Anclar</button> }
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
          {
            !rowsSaveResponse.length == 0 && rowsSaveResponse.map((item, index) => (
              <Table key={index+10} rows={rowsSaveResponse[index]} responseFlag={true} responseArray={rowsSaveResponse} setRowsSaveResponse={setRowsSaveResponse} index={index} />
            ))
          }
        </div>
        <div className='default-tables'>
          {
            !rowsInit.length == 0 && rowsInit.map((item, index) => 
            {
              if(item.rows.length > 0)
                return (
                  <Table key={index} rows={item.rows} name={item.name} />
                ) 
            }
            )
          }
        </div>
      </div>
    </>
  )
}