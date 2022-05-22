import styles from './SignForms.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitError, setSubmitError] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email, password);
        setEmail("");
        setPassword("");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };
        fetch('http://localhost:8000/signIn', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status) {
                    localStorage.auth = data.token;
                    navigate('/enterURL');
                }
                else {
                    setSubmitError(data.error);
                }
        });
    }
 
    return (
      <form onSubmit={submitHandler}>  
        <div className={styles.container}>   
            <label>Email : </label>   
            <input type="text" placeholder="Enter Email" name="email" required
            value={email} onChange={onEmailChange}  />  

            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required 
            value={password} onChange={onPasswordChange} />  

            <button type="submit">Sign In</button>    
            <br></br>
            {submitError && <p style={{color: "red"}}>Wrong Credentials</p>}  
        </div>   
    </form> 
    );
}

export default SignInForm;