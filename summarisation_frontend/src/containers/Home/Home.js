import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    var content = String.raw`    Reading long press releases everyday is not an easy task 
                            in today's busy schedule.    

        So we cut the clutter and deliver their summary to you. 
    Save your Time with our News Summarisation Website. 
    `
    return <div className={styles.container}>
        <br/>
        <p className={styles.heading}>
            News Article Summarisation
        </p>
        <br/>

        <div className={styles.outerDiv}>
            <div className={styles.leftDiv}>
                <img src={require('./mainImage.jpg')} />
            </div>
            <div className={styles.rightDiv}>
                <h3>Just Read the Short Summary</h3>
                <br/>
                <p>Reading long press releases everyday is not an easy task in today's busy schedule. So we cut the clutter and deliver their summary to you. Save your Time with our News Summarisation Website.</p>
            </div>
        </div>
      </div>
}

export default Home;