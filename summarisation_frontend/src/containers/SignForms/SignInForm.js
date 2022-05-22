import styles from './SignForms.module.css';

const SignInForm = () => {
    return (
      <form>  
        <div className={styles.container}>   
            <label>Email : </label>   
            <input type="text" placeholder="Enter Email" name="email" required />  
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required />  
            <button type="submit">Sign In</button>      
        </div>   
    </form> 
    );
}

export default SignInForm;