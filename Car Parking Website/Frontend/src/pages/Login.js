import React, { useState,useRef  } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import { setUser } from '../reducers/userReducer'
import './../css/auth.scss'
import { VscEye } from "react-icons/vsc";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState()
    const passwordToggle = useRef();
    const TogglePass = () => {
        const filedType = passwordToggle.current.type;
        passwordToggle.current.type =
          filedType === "password" ? "text" : "password";
      };
    // Login API call with callback functions for handling response
    const handleLogin = () => {
        login({ email, password, handleLoginSuccess, handleLoginFailure })
    }

    const handleLoginSuccess = (data) => {
        dispatch(setUser({ ...data?.user, token: data?.token }));
        navigate('/')
        alert("Login successfully");
    }

    const handleLoginFailure = (error) => {
        setError(error)
    }

    return (
        <div className='container-fluid auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign in</h3>
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <label htmlFor="password" className="form-label">Password</label>
                <div class="input-group mb-3">
                    
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="form-control"
                    ref={passwordToggle}
                    name="password"
                  />
                  <button className="btn btn-outline-secondary"  id="button-addon2" onClick={TogglePass}>
                    <VscEye /> 
                  </button>
                </div>
                <div className='d-flex justify-content-between'>
                    Are you a new user?<Link to='/register'>Create account</Link>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleLogin()}>Submit</button>
            </div>
        </div>
    )
}

export default Login