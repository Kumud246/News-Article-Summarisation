import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleURLForm = () => {
    const navigate = useNavigate();
    const [urlValue, setUrlValue] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const handleUrlChange = (event) => {
        setUrlValue(event.target.value);
    }

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

    const submitHandler = () => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Host': 'news-article-extraction.p.rapidapi.com',
                'X-RapidAPI-Key': 'a99c9a49f7msh8a39d45d6090ea7p10708bjsn3c9a159d3086'
            },
            body: `{"url": "${urlValue}"}`
        };

        setLoading(true);
        
        fetch('https://news-article-extraction.p.rapidapi.com/', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        status_code: response.status_code,
                        author: response.author, 
                        title: response.title,
                        publishedAt: response.publishedAt,
                        content: response.content,
                        urlToImage: response.urlToImage
                    })
                };

                fetch('http://localhost:8000/getArticleSummary', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(data.status === "success") {
                            const obj = {
                                urlToImage: data.urlToImage,
                                author: data.author,
                                title: data.title,
                                publishedAt: data.publishedAt,
                                content: data.content
                            }
                            setLoading(false);
                            setUrlValue("")
                            navigate('/articleSummary', {state: obj})
                        }
                        else {
                            setError(true);
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err));
    }

    return <>
        <h2>Paste the URL of the news article</h2>
        <input type="text" placeholder="Enter URL" value={urlValue} onChange={handleUrlChange} />
        <br/> <br/>
        <button onClick={submitHandler}>Submit</button>
        <br/>
        {error && <p style={{color: "red"}}>There was some error in getting summary</p>}
        {loading && <p style={{color: "green"}}>Getting your Summary prepared</p>}
    </>
}

export default ArticleURLForm;