import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (response.ok) {
        const json = await response.json();

        // Check the success criteria specific to your server
        if (json.success) {
          // Store the token in localStorage
          localStorage.setItem('userEmail', credentials.email);
          localStorage.setItem('authToken', json.token);

          // Redirect to the home page
          navigate("/");
        } else {
          // Handle unsuccessful login
          alert("Invalid credentials");
        }
      } else {
        // Handle HTTP error
        alert("Error during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      // Handle other errors, e.g., network issues
      alert("Error during login. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name='email' value={credentials.email} onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name='password' value={credentials.password} onChange={onChange}
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I am new</Link>
      </form>
    </div>
  );
}
