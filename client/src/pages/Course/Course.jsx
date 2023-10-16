import { useEffect, useState } from 'react'
import { executeQuery, initializeApp } from '../../api/api.js'
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

export default function Course() {

	const [query, setQuery] = useState('SELECT id, nombre, edad FROM cliente')

	const [rows, setRows] = useState([])

	const [rowsInit, setRowsInit] = useState([])

	const [message, setMessage] = useState({});

	const [loading, setLoading] = useState(false);

	const { showSaveQuery, showNav, setShowNav, arrayActivities, setArrayActivities } = useMainContext()

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

	const notify = () => toast.success("Lección terminada!");

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
				const found = arrayActivities.findIndex((element) => element.next == true)
				if(found >= 0){
					if(arrayActivities[found].response.includes(query)){
						arrayActivities[found].next = false
						arrayActivities[found].resolve = true
						if(arrayActivities[found+1]){
							arrayActivities[found+1].next = true
						}else{
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
						<textarea spellCheck="false" className='textarea-query-course' value={query} onChange={(handleChange)}></textarea>
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
					<CourseSection />
					<div className='default-tables-course'>
						{
							!rowsInit.length == 0 && rowsInit.map((item, index) => (
								<Table key={index} rows={rowsInit[index]} />
							))
						}
					</div>
				</div>
			</div>
		</>
	)
}