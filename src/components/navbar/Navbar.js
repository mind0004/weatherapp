import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <Link to={`${process.env.PUBLIC_URL}/`}>Now</Link>
                </ul>
                <ul>
                    <Link to={`${process.env.PUBLIC_URL}/daily`}>Daily</Link>
                </ul>
            </nav>
        )
    }
}

export default Navbar;