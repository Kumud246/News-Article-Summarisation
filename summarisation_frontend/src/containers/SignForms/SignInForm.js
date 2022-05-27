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
        <h3>Sign In</h3>
        <br></br>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <br></br>
        {submitError && <p style={{color: "red"}}>Wrong Credentials</p>} 
      </form>
    );
}

export default SignInForm;