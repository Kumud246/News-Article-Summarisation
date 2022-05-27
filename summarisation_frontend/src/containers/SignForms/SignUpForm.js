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
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={username}
            onChange={onUserNameChange}
          />
        </div>
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
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        <br></br>
        {submitError && <p style={{color: "red"}}>User with this email already exists</p>}
      </form>
      );
}

export default SignUpForm;