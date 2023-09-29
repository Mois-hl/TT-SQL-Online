import { useEffect, useRef, useState } from 'react';
import './UpdateQuery.css';
import { useMainContext } from '../../context/Context';
import { updateDocById } from '../../firebase/client';

export default function UpdateQuery({ item }) {

	const { setShowUpdateQuery } = useMainContext();

	const [title, setTitle] = useState(item.title);
	const [description, setDescription] = useState(item.description);
	const [query, setQuery] = useState(item.query);

	const handleSubmit = (event) => {
		event.preventDefault();
		updateDocById(item.id, {title, description, query})
		.then(() => {
			console.log('success');
		})
		.catch(err => console.log(err))
		setShowUpdateQuery(false)
		
	}

	return (
		<div className='container-updatequery'>
			<h4 >Actualizar sentencia</h4>
			<form className='inputs-updatequery' onSubmit={handleSubmit}>
				<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='título' />
				<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder='descripción' />
				<textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder='sentencia' ></textarea>
				<div className='buttons-updatequery'>
					<button className='button-close-updatequery' type='button' onClick={() => setShowUpdateQuery(false)} >Cerrar</button>
					<button className='button-save-updatequery' type='submit' >Guardar</button>
				</div>
			</form>
		</div>
	)
} 