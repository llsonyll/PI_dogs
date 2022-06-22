import './landing.scss';
import { Link } from "react-router-dom";
import HenryLogo from '../../assets/henry.png'
import DogsLogo from '../../assets/dog.png'

// React-Icons
import { IconContext } from "react-icons";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiPostgresql } from "react-icons/si";


const Landing = () => {
    return <div className="landing">
        <div className="landing__header">
            <img src={HenryLogo} alt="henryLogo" className='landing__header__img'/>
        </div>
        <div className="landing__content">
            <div className="landing__content__main">
                <img src={DogsLogo} alt="dogsLogo" />
                <div className="title">
                    DOGS API
                </div>
                <div className="subtitle"> HENRY INDIVIDUAL PROJECT</div>
                <Link to="/home" className='btn'>
                    Iniciar
                </Link>
            </div>
            <div className="landing__content__footer">
                <div className="icons">
                    <IconContext.Provider value={{ color: "black", size: "1.5rem"}}>
                        <SiPostgresql />
                        <SiExpress />
                        <FaReact />
                        <FaNodeJs />
                    </IconContext.Provider>
                </div>
                <span> by <a href='https://github.com/llsonyll' target="_blank" rel='noreferrer'> llsonyll </a> </span>
            </div>
        </div>
    </div>
}

export default Landing;