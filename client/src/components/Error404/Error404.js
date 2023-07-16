import './Error404.css';
import React from "react";
import { Link } from 'react-router-dom';

export const Error404 = () => {
    return (
        <main id="notFound" data-testid="error-404">
            <img src={require('../../assets/404.png')} />
            <p className="reason">The route you have selected is invalid.</p>
            <Link to="/"><i className="fa-solid fa-arrow-left"></i>Back to home</Link>
        </main>
    )
}