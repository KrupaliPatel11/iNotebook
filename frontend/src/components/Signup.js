import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({ email: "", password: "", name: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/user/signup`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.token);
      navigate('/');
      props.showAlert("Account Created Successfully", "success");
    } else {
     props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({
      ...credentials, [e.target.name]: e.target.value
    })
  }

  return (
    <div className='my-3 mx-2'>
      <form className='my-3' onSubmit={handleSubmit} >
        <h2>Signup Here</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="nameHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup;
