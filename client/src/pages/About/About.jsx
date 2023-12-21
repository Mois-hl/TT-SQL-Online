import "./About.css"
import { RxHamburgerMenu } from 'react-icons/rx';
import NavBar from '../../components/NavBar/NavBar';
import { useMainContext } from "../../context/Context";

export default function About() {

    const { showNav, setShowNav } = useMainContext()

    return (
        <div>
            <header>
                <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
            </header>
            <div>
                <NavBar show={showNav} />
            </div>
            <div className="about-container">
                <div className="flex-about-container">
                    <div style={{ marginBottom: '40px' }}>
                        <p>Esto es un prototipo de aplicación web creada con fines académicos como parte de la unidad de aprendizaje <span style={{ fontWeight: 700 }}>Trabajo Terminal</span> de la carrera de <span style={{ fontWeight: 700 }}>Ingeniería en Sistemas Computacionales</span> de la ESCOM (Escuela Superior de Cómputo) del IPN (Instituo Politécnico Nacional)</p>
                        <p><span style={{ color: '#09f' }}>Creado por: </span>Moisés Hernández López</p>
                        <p><span style={{ color: '#09f' }}>Descripción: </span>Ambiente para probar sentencias en lenguaje SQL, herramienta didáctica para el aprendizaje de SQL</p>
                        <p><span style={{ color: '#09f' }}>Desarrollado con: </span><span style={{ color: '#007fff', fontWeight: 700 }}>React versión 18</span></p>
                        <p><span style={{ color: '#09f' }}>Sistema gestor de bases de datos: </span><span style={{ color: '#ffda00', fontWeight: 700 }}>MySQL</span></p>
                    </div>
                    <div style={{ alignSelf: 'flex-end' }}>
                        <span style={{ background: "#09f", borderRadius: '20px', padding: '8px 20px', color: '#f6f6f6', alignSelf: 'flex-end' }}>versión 1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}