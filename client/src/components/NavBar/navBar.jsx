import './navBar.scss';
import HenryLogo from '../../assets/henry.png';
import DogsLogo from '../../assets/dog.png';

import { Link } from "react-router-dom";

const NavBar = ({ align, justify, landing = true, title }) => {
    const propStyle = {
        "alignItems" : align ?? "center",
        "justifyContent" : justify ?? "center",
    }

    return <div className="navBar" style={propStyle}>
        {
            landing ? <img src={HenryLogo} alt="henryLogo" className='navBar__logo'/> : <>
                <Link to="/home" className="navBar__title">
                    <img src={DogsLogo} alt="dogs" className='img' />
                    <div className='text'> { title ?? 'Home' }</div>
                </Link>
                <img src={HenryLogo} alt="henryLogo" className='navBar__henry' />
            </>
        }
    </div>
}

export default NavBar;