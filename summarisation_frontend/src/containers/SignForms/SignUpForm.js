import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignForms.module.css';

const SignUpForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [submitError, setSubmitError] = useState("");

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email, password, username);
        setEmail("");
        setPassword("");
        setUserName("");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password, userName: username })
        };
        fetch('http://localhost:8000/signup', requestOptions)
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
            value={email} onChange={onEmailChange} />  

            <label>Username : </label>   
            <input type="text" placeholder="Enter Username" name="username" required 
            value={username} onChange={onUserNameChange}/>  

            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required
            value={password} onChange={onPasswordChange} />  

            <button type="submit">Sign Up</button>    
            <br></br>
            {submitError && <p style={{color: "red"}}>User with this email already exists</p>}
        </div>   
  </form> 
      );
}

export default SignUpForm;