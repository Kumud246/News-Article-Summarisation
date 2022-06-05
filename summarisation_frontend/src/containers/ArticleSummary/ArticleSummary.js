import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './ArticleSummary.module.css'

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
    
    return <div className={styles.container}>
        <br/>
        <p className={styles.heading}>
            Article Summary
        </p>
        
            {location.state && 
            <div>

            <p className={styles.titleHeading}>
                {location.state.title}
            </p>

            <span className={styles.authorClass}>
                <span>By </span>
                <span>{location.state.author.map((author, index) => {
                    if(index !== location.state.author.length - 1) {
                        return `${author}, `
                    }
                    else {
                        return author;
                    }
                })}
                </span>
            </span>
            <br/>

            <span className={styles.publishedAt}>
                <span>Published At - </span>
                <span>{location.state.publishedAt}</span>
            </span>
            <br/><br/>
            
            <div className={styles.articleImage}>
                <img  src={location.state.urlToImage} alt="Image for article" />
            </div>
            <br></br>

            <p className={styles.content} >{location.state.content}</p>

            </div>

            }
    </div>
}

export default ArticleSummary;