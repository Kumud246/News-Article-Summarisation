import styles from './SignForms.module.css';

const SignUpForm = () => {
    return (
      <form>  
      <div className={styles.container}>   
          <label>Email : </label>   
          <input type="text" placeholder="Enter Email" name="email" required />  
          <label>Username : </label>   
          <input type="text" placeholder="Enter Username" name="username" required />  
          <label>Password : </label>   
          <input type="password" placeholder="Enter Password" name="password" required />  
          <button type="submit">Sign Up</button>    
      </div>   
  </form> 
      );
}

export default SignUpForm;