import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../api/api'
import './../css/auth.scss'
import { useNavigate } from 'react-router-dom';
import { VscEye } from "react-icons/vsc";


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpass, setCpass] = useState('')
    const [type, setType] = useState('')
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate();
    const passwordToggle = useRef();
    const TogglePass = () => {
        const filedType = passwordToggle.current.type;
        passwordToggle.current.type =
          filedType === "password" ? "text" : "password";
      };
    const handleRegister = () => {
        if(cpass !== password){
            alert("Password not matched!");
          }
          else{
        setIsRegistered(false)
        setError()
        register({ name, email, password, type, handleRegisterSuccess, handleRegisterFailure })
        navigate('/login')
        alert("Account created successfully");
    }
    }

    const handleRegisterSuccess = () => {
        setIsRegistered(true)
    }

    const handleRegisterFailure = (error) => {
        
        setError(error)
    }


    return (
        <div className='auth-container'>
            <div className='card login-card m-auto p-5'>
                
                <h3 className='mb-4'>Sign up</h3>
                {isRegistered && <div className="alert alert-success" role="alert">
                    Registration successful! 
                </div>}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
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
           
                 
            <label htmlFor="password" className="form-label">Confirm password</label>

                <div className="mb-3">
                    <input type="password" 
                    className="form-control" 
                    id="confirm password" 
                    value={cpass} onChange={(e) => setCpass(e.target.value)} 
                    placeholder="Confirm password"
                    required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Type</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="owner">Owner</option>
                        <option value="seeker">Seeker</option>
                    </select>
                </div>
                <div className='d-flex justify-content-between'>
                    Are you a existing user?<Link to='/login'>Sign in</Link>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleRegister()}>Submit</button>
            </div>
        </div>
    )
}

export default Register