import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticleSummary = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.auth })
        };
        fetch('http://localhost:8000/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(!data.status) {
                    navigate('/');
                }
        });
    })
    
    return <>
        {console.log(location.state)}
        <h1>Article Summary</h1>
        <hr/>
            {location.state && 
            <div>
            {/* <img src={location.state.urlToImage} />
            <br></br> */}

            <h2>Article Title - {location.state.title}</h2>

            <h3>Author - {location.state.author.map((author, index) => {
                if(index !== location.state.author.length - 1) {
                    return `${author}, `
                }
                else {
                    return author;
                }
            })}</h3>

            <h4>Published At - {location.state.publishedAt}</h4>
            <br/>
            <h3>Summary</h3>
            <p>{location.state.content}</p>
            </div>
            }
    </>
}

export default ArticleSummary;