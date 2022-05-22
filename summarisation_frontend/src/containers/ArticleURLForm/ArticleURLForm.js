import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ArticleURLForm = () => {
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
        <h2>Paste the URL of the news article</h2>
        <input type="text" placeholder="Enter URL" />
        <br/> <br/>
        <button>Submit</button>
    </>
}

export default ArticleURLForm;