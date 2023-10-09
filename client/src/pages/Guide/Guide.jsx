import { useMainContext } from '../../context/Context';
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';
import './Guide.css'
import CommandText from '../../components/CommandText/CommandText';
import { useState } from 'react';
import commandArray from './Guide.json'

export default function Guide() {

    const[commmandInfo, setCommandInfo] = useState()

    const { showNav, setShowNav } = useMainContext()

    const handleCommandText = (command) => {
        const element = commandArray.find((item) => item.command == command)
        setCommandInfo(element)
    }

    return (
        <div>
            <header>
                <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
            </header>
            <div>
                <NavBar show={showNav} />
            </div>
            <div className='container-guide'>
                <div>
                    <p style={{ color: '#d6d6d6', fontSize: '28px' }}>Guía de comandos</p>
                    <p style={{ color: '#d6d6d6', fontSize: '18px', fontWeight: 300 }} >Explicación de los comandos más usados en SQL</p>
                </div>
                <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
                    <div className='lista-guide'>
                        <ul>
                            {
                                commandArray.map((element) => (
                                    <li onClick={() => handleCommandText(element.command)}>{element.command}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        { commmandInfo && <CommandText command={commmandInfo.command} text={commmandInfo.text} example={commmandInfo.example} /> }
                    </div>
                </div>
            </div>
        </div>
    )
}