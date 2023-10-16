import { useEffect, useRef } from 'react';
import './FormQuery.css';
import { useMainContext } from '../../context/Context';
import { saveQuery } from '../../firebase/client';
import 'react-toastify/dist/ReactToastify.css';

export default function FormQuery({ textAreaQuery }) {

	const { showSaveQuery, setShowSaveQuery, notifyCreateForm } = useMainContext();

	const title = useRef();
	const description = useRef();
	const query = useRef();

	const { currentUser } = useMainContext()

	const handleSubmit = (event) => {
		event.preventDefault();
		saveQuery({
			title: title.current.value,
			description: description.current.value,
			query: query.current.value
		}, currentUser.email)
		.then(()=>{
			notifyCreateForm()
		})
		.catch(err => {
			console.log(err)
		})
		setShowSaveQuery(false)
	}

	useEffect(() => {
		title.current.value = '';
		description.current.value = '';
	}, [showSaveQuery])

	return (
		<div className='container-dialogbox'>
			<h4>Guardar sentencia</h4>
			<form className='inputs-dialogbox' onSubmit={handleSubmit}>
				<input ref={title} placeholder='título' />
				<input ref={description} placeholder='descripción' />
				<textarea ref={query} placeholder='sentencia' value={textAreaQuery} readOnly></textarea>
				<div className='buttons-dialogbox'>
					<button className='button-close-dialogbox' type='button' onClick={() => setShowSaveQuery(false)} >Cerrar</button>
					<button className='button-save-dialogbox' type='submit' >Guardar</button>
				</div>
			</form>
		</div>
	)
} 