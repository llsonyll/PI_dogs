import './landing.scss';
import { Link } from "react-router-dom";


const Landing = () => {
    return <div className="landing">
        
    <h1> Landing </h1>

    <Link to="/home"> 
        <button> Iniciar </button>
    </Link>

    </div>
}

export default Landing;