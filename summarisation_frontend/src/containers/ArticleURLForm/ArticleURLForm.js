import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ArtilcleURLForm.module.css'

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
                'X-RapidAPI-Key': 'b04307597bmsh29191abc0188314p157ff9jsn647fed755141'
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
        <br/>
        <p className={styles.heading}>
            Paste the URL of the news article
        </p>
        <br/>

        <div className={styles.content}>
        <input
            type="text"
            className="form-control"
            placeholder="Enter URL"
            value={urlValue}
            onChange={handleUrlChange}
          />
        <br/> 
        <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                Submit
            </button>
        </div>
        <br/>
        {error && <p style={{color: "red"}}>There was some error in getting summary</p>}
        {loading && <div className={styles.loading}>Loading&#8230;</div>}
        </div>
    </>
}

export default ArticleURLForm;