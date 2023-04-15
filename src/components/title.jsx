import React, { useState } from 'react'
import { article } from './article';
import { Link } from "react-router-dom";

function Title() {
    const [isEnglish, setIsEnglish] = useState(true);

    function handleLanguageChange() {
        setIsEnglish(!isEnglish);
    }

    const handleClick = () => {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log(randomNumber);
    };
    return (
        <>
            <div className="text-center mt-5">
                <img src="Bootstrap_logo.png" width={100} alt="" />
                <h1>{isEnglish ? article.title.en : article.title.id}</h1>
                <p>{isEnglish ? article.description.en : article.description.id}</p>
                <button className='btn btn-primary' onClick={handleClick}>Generate Random Number</button><br />
                <button className="btn btn-success mt-3" onClick={handleLanguageChange}>
                    {isEnglish ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
                </button>
                <Link to="/landing-page" >
                    <button className='btn btn-warning mt-3 ms-2'>Halaman Landing Page</button>
                </Link>
            </div>
        </>
    )
}

export default Title