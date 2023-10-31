import { useNavigate } from 'react-router-dom';
import './CommandText.css';

export default function CommandText({ command, text, example, image }) {

	const navigate = useNavigate()

	const renderExampleText = (text) => {
		return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
	}

	return (
		<div className='container-commandtext'>
			<p style={{ fontSize: '24px' }}>Comando: <span style={{ color: '#09f' }} >{command}</span></p>
			<p style={{ maxWidth: '120vh' }}>{text}</p>
			{ image && <img src={image} style={{ width: '300px', alignSelf: 'center', marginBottom: '10px' }} /> }
			<p>Ejemplo:</p>
			<code>{renderExampleText(example)}</code>
			<button onClick={() => navigate('/')} className='button-send' style={{ width: 'fit-content' }}>Probar!</button>
		</div>
	)
}