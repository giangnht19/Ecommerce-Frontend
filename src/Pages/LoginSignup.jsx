import React from 'react'
import './CSS/LoginSignUp.css'
import { useState } from 'react'

const LoginSignup = () => {

  const [state, setState] = useState("Login")

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const login = async () => {
    console.log('Login', form)
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/form-data'
      },
      body: JSON.stringify(form)
    }).then((response) => response.json()).then((data) => {
      responseData = data;
    })

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.href = '/';
    }
    else {
      alert(responseData.message);
    }
  }

  const signup = async () => {
    console.log('Sign Up', form)
    let responseData;
    await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/form-data'
      },
      body: JSON.stringify(form)
    }).then((response) => response.json()).then((data) => {
      responseData = data;
    })

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.href = '/';
    }
    else {
      alert(responseData.message);
    }
  }

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? <input name='username' value={form.username} onChange={changeHandler} type="text" placeholder='Username' /> : null}
          <input name='email' value={form.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={form.password} onChange={changeHandler} type="password" placeholder='Password'/>
        </div>
        <button onClick={() => {state==="Login"?login():signup()}}>Continue</button>
        {state === 'Sign Up' ? <p className="loginsignup-login">Already have and account? <span onClick={() => setState("Login")}>Login here</span></p> 
                              : <p className="loginsignup-login">Create an accoutn? <span onClick={() => setState("Sign Up")}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup