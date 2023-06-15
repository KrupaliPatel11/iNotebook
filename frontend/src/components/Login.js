import React, { useState } from 'react'
import {useNavigate}  from 'react-router-dom'

const Login = (props) => {
    const host = "http://localhost:5000"
    const [credential, setCredential] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await response.json()
        console.log(json);
        if(json.success) {
            // save the token and redirect
            localStorage.setItem('token', json.token);
            props.showAlert("Loggedin Successfully", "success")
            navigate('/');
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredential({
            ...credential, [e.target.name]: e.target.value
        })
    }


    return (
        <div className='my-3 mx-2'>
            <h2>Login Here</h2>
            <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={onChange} className="form-control" id="email" name='email' value={credential.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="password" value={credential.password} name='password' />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}


export default Login;
