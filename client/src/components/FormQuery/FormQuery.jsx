import { useEffect, useRef, useState } from 'react';
import './FormQuery.css';
import { useMainContext } from '../../context/Context';
import { saveQuery } from '../../firebase/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormQuery({ textAreaQuery }) {

	const { showSaveQuery, setShowSaveQuery } = useMainContext();

	const [disabled, setDisabled] = useState(false)

	const title = useRef();
	const description = useRef();
	const query = useRef();

	const handleSubmit = (event) => {
		event.preventDefault();
		setDisabled(true)
		saveQuery({
			title: title.current.value,
			description: description.current.value,
			query: query.current.value
		})
		.then(()=>{
			notify()
			setDisabled(true)
		})
		.catch(err => {
			console.log(err)
			setDisabled(true)
		})
	}

	useEffect(() => {
		title.current.value = '';
		description.current.value = '';
	}, [showSaveQuery])

	const notify = () => toast.success("Sentencia guardada correctamente!");

	return (
		<div className='container-dialogbox'>
			<ToastContainer theme="colored" autoClose={2000} />
			<h4>Guardar sentencia</h4>
			<form className='inputs-dialogbox' onSubmit={handleSubmit}>
				<input ref={title} placeholder='título' />
				<input ref={description} placeholder='descripción' />
				<textarea ref={query} placeholder='sentencia' value={textAreaQuery} readOnly></textarea>
				<div className='buttons-dialogbox'>
					<button className='button-close-dialogbox' type='button' onClick={() => setShowSaveQuery(false)} >Cerrar</button>
					<button className='button-save-dialogbox' type='submit' disabled={disabled} >Guardar</button>
				</div>
			</form>
		</div>
	)
} 