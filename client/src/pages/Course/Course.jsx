import { useMainContext } from '../../context/Context';
import NavBar from '../../components/NavBar/NavBar';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Course() {

    const { showNav, setShowNav } = useMainContext()

    return (
        <div>
            <header>
                <RxHamburgerMenu onClick={() => setShowNav(!showNav)} style={{ cursor: 'pointer' }} />
            </header>
            <div>
                <NavBar show={showNav} />
            </div>
            <div>
                Course page
            </div>
        </div>
    )
}