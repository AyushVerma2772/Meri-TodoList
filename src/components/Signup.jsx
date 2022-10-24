import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const profilePhoto = "https://i.pinimg.com/originals/dc/c9/ce/dcc9cea8525b59b91d1a6ed0e27fff59.gif";

    if (!name || !email || !password) {
      setAlert(true);
      setError(true);
      setMsg("All fields are required !!!")
      return
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      // console.log(user);
      await updateProfile(user, {displayName: name, photoURL: profilePhoto});

      setAlert(true);
      setError(false)
      setMsg("Account created successfully !!!");
      // navigate to home page
      navigate("/");

    } catch (err) {
      setAlert(true);
      setError(true);
      setMsg(err.message)

    }

  }


  return (
    <div className="container-fluid my-container position-relative">

      {/* Alert */}
      <div className={`alert alert-${error ? 'danger' : 'success'} alert-dismissible fade show position-absolute top-0`} role="alert" style={{ display: `${alert ? 'block' : 'none'}` }}>
        <strong>{error ? 'Error !!!' : 'Sign up'}</strong> {msg}
        <button type="button" className="btn-close" onClick={e => setAlert(false)} ></button>
      </div>

      <div >
        <h1 className='my-5'>Register</h1>
      </div>

      <form className='form-floating my-form' onSubmit={e => handelSubmit(e)}>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingName" placeholder="Name" />
          <label htmlFor="floatingName">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button type="submit" className="btn btn-success my-3">Sign up</button>
      </form>

    </div>
  )
}

export default Signup