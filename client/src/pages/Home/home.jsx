import './home.scss';
// import { Link } from "react-router-dom";

import NavBar from '../../components/NavBar';
import { useState } from 'react';

// Icons
import { MdDoubleArrow } from "react-icons/md";


const Home = () => {

    const [ sbOpen, setSbOpen ] = useState(true);

    return <div className="home">
        <NavBar landing={false} justify="space-between"/>
        <div className="content">
            <div className={sbOpen ? 'sidebar opened' : 'sidebar closed'}>
                <button onClick={() => setSbOpen(!sbOpen)} className="sidebar__toggle">
                    <MdDoubleArrow />
                </button>

            </div>
            <div className="items"></div>
        </div>
    </div>
}

export default Home;