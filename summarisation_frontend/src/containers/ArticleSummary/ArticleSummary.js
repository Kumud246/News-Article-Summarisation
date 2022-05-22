import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ArticleSummary = () => {
    const navigate = useNavigate();

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
        <h1>Article Summary</h1>
        <hr/>
        <div>
            Article Summary will be here.
        </div>
    </>
}

export default ArticleSummary;