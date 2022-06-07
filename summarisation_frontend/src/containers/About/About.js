import styles from './About.module.css'


const About = () => {
    return <>
        <div className={styles.container}>
            <p className={styles.heading}>
                About News Article Summarisation
            </p>
            <br/>
            <p className={styles.content}>
                We know that, everyday large press releases are there on the online platform in form
                of web pages on the news websites. To read these press releases completely, a lot of
                time is required and also many people read just the title and do not even see the other
                important information in the article. That’s why they do not get the complete
                information. So, to save time and also get all the important information, these large
                press releases can be converted to short summaries with the help of Machine
                Learning.
            </p>
        </div>
    </>
}

export default About;