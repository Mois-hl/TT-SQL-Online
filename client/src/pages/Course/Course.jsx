import { useEffect, useState } from 'react'
import { executeQuery, initializeApp, resetApp } from '../../api/api.js'
import Table from '../../components/Table/Table.jsx'
import Message from '../../components/Message/Message.jsx'
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoMdSend } from 'react-icons/io';
import FormQuery from '../../components/FormQuery/FormQuery';
import { useMainContext } from '../../context/Context';
import './Course.css'
import CourseSection from '../../components/CourseSection/CourseSection.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import activities from '../../components/CourseSection/activities template.json'
import hash from 'hash-it';

export default function Course() {

	const [query, setQuery] = useState('SELECT idCliente, nombre, edad FROM cliente')

	const [rows, setRows] = useState([])

	const [rowsInit, setRowsInit] = useState([])

	const [message, setMessage] = useState({});

	const [loading, setLoading] = useState(false);

	const [select, setSelect] = useState(0);

	const { showSaveQuery, showNav, setShowNav, arrayActivities, setArrayActivities } = useMainContext()

	useEffect(() => {
		setShowNav(false)
		setArrayActivities(activities)
		const init = async () => {
			const responseReset = await resetApp();
			const response = await initializeApp();
			if (Array.isArray(response.data))
				if (!response.data.length == 0)
					setRowsInit(response.data);
		}
		init();
	}, [])

	const notify = () => toast.success("Laboratorio terminado!");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setRows([]);
		setMessage({});
		if (query.toUpperCase().includes('SHOW TABLES') || query.toUpperCase().includes('DATABASES') || query.toUpperCase().includes('DATABASE')) {
			setMessage({ data: 'Sentencia no permitida.', error: true })
		} else {
			const response = await executeQuery(query);
			if (Array.isArray(response.data)) {
				if (!response.data.length == 0) {
					setRows(response.data)
					const valuesArray = response.data.map((item) => Object.values(item));
					const hashValue = hash(valuesArray);
					const found = arrayActivities[select].activities.findIndex((element) => element.next == true)
					if (found >= 0) {
						if (arrayActivities[select].activities[found].response == hashValue) {
							arrayActivities[select].activities[found].next = false
							arrayActivities[select].activities[found].resolve = true
							if (arrayActivities[select].activities[found + 1]) {
								arrayActivities[select].activities[found + 1].next = true
							} else {
								notify()
							}
						}
					}
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
			<div className={showSaveQuery ? 'layout-course-page' : 'layout-course-page active'} onClick={() => setShowNav(false)}>
				<div>
					<form className='form-course-query' onSubmit={handleSubmit}>
						<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px', color: '#fff' }}>
							<label>Input</label>
							<div>
								<button className='button-clear' type='button' onClick={() => setQuery('')} ><div style={{ display: 'flex', gap: '4px' }} ><FaRegTrashCan /> <p>Limpiar</p></div></button>
								<button className='button-send' type='submit' ><div style={{ display: 'flex', gap: '4px' }} ><IoMdSend /> <p>Enviar</p></div></button>
							</div>
						</div>
						<textarea placeholder='Ingresa una sentencia SQL...' spellCheck="false" className='textarea-query' value={query} onChange={(e) => setQuery(e.target.value)} />
					</form>
					<div style={{ color: '#fff', marginBottom: '10px' }}>
						<label>Output</label>
					</div>
					<div>
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
				</div>
				<div>
					{arrayActivities && <CourseSection array={arrayActivities} select={select} setSelect={setSelect} />}
					<div className='default-tables-course'>
						{
							!rowsInit.length == 0 && rowsInit.map((item, index) => {
								if (item.rows.length > 0)
									return (
										<Table key={index} rows={item.rows} name={item.name} />
									)
							}
							)
						}
					</div>
				</div>
			</div>
		</>
	)
}