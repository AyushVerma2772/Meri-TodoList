import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;


    if (!email || !password) {
      setError(true);
      setMsg("All fields are required !!!")
      return
    }

    try {
        await signInWithEmailAndPassword(auth, email, password)
        setAlert(true);
        setError(false)
        setMsg("Login Successfully");
        // Navigate to home page
        navigate("/");

    } catch (err) {
      setAlert(true);
      setError(true);
      setMsg(err.message)
      
    }
  }

  return (
    <>
      <div className="container-fluid my-container position-relative">
        <div>
          <h1 className='my-5'>Login</h1>
        </div>

        {/* Alert */}
        <div className={`alert alert-${error ? 'danger' : 'success'} alert-dismissible fade show position-absolute top-0`} role="alert" style={{ display: `${alert ? 'block' : 'none'}` }}>
          <strong>{error ? 'Error !!!' : 'Sign up'}</strong> {msg}
          <button type="button" className="btn-close" onClick={e => setAlert(false)} ></button>
        </div>

        <form className='form-floating my-form' onSubmit={e => handelSubmit(e)}>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary my-3">Login</button>
        </form>

      </div>
    </>
  )
}

export default Login