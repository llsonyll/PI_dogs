import './routeButton.scss';
import { Link } from "react-router-dom";

const Button = ({ text = 'Iniciar', route = 'home', bgColor = "#FF9800", textColor = "#fff" }) => {

    const propStyle = {
        'backgroundColor': bgColor,
        'color': textColor
    }

    return  <Link to={`/${route}`} style={propStyle} className='button'>
        {text}
    </Link>
}

export default Button;