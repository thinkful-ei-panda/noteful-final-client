import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="border wrapper">
            <h1><Link className="main-link" to='/'>Noteful</Link></h1>
        </header>
    );
};

export default Header;