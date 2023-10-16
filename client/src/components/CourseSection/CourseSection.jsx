import { useEffect, useState } from 'react'
import './CourseSection.css'
import courseArray from './CourseSection.json'
import { useMainContext } from '../../context/Context'

export default function CourseSection() {

	const {arrayActivities, setArrayActivities} = useMainContext()

	useEffect(() => {
		setArrayActivities(courseArray)
	}, [])

	return (
		<div className='course-section'>
			<div>
				<p style={{ marginBottom: '10px' }}>Lección 1 - Consultas con el comando SELECT</p>
				<ul>
					{
						arrayActivities && arrayActivities.map((element, index) => (
							<li style={element.resolve ? { opacity: '0.2' } : {}} key={index}>
								<span dangerouslySetInnerHTML={{ __html: element.activity }}></span> {element.resolve && "✅"}
							</li>
						))
					}
				</ul>
			</div>
			<div style={{ alignSelf: 'end' }} >
				<button className='previous-button-course' >Lección previa</button>
				<button className='next-button-course' >Siguiente</button>
			</div>
		</div>
	)
}