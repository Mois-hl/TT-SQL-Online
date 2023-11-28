import { useEffect, useState } from 'react'
import { useMainContext } from '../../context/Context'
import './CourseSection.css'

export default function CourseSection({array, select, setSelect}) {

	// const [select, setSelect] = useState(0);

	const handleNextLesson = () => {
		if(select < array.length-1)
			setSelect(select+1)
	}

	const handlePreviousLesson = () => {
		if(select > 0)
			setSelect(select-1)
	}

	return (
		<div className='course-section'>
			<div>
				<p style={{ marginBottom: '10px' }}>{array[select].lesson}</p>
				<ul>
					{
						array[select].activities.map((element, index) => (
							<li style={element.resolve ? { opacity: '0.2', marginBottom: '6px' } : {marginBottom: '6px'}} key={index}>
								<span dangerouslySetInnerHTML={{ __html: element.activity }}></span> {element.resolve && "✅"}
							</li>
						))
					}
				</ul>
			</div>
			<div style={{ alignSelf: 'end' }} >
				<button className='previous-button-course' onClick={handlePreviousLesson} >Lección previa</button>
				<button className='next-button-course' onClick={handleNextLesson} >Siguiente</button>
			</div>
		</div>
	)
}