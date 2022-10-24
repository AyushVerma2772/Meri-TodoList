import { signOut, updateProfile } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(auth);
        navigate("/login")
    }

    const editName = async () => {
        await updateProfile(user, {
            displayName: prompt("Enter your new name")
        })
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/' >Meri TodoList</Link>
                    <div className='d-flex align-items-center' >
                        {user && <img src={user.photoURL} alt="profile" style={{ height: '40px', width: '40px', borderRadius: '50%' }} className='image-fluid' />}

                        {user && <span className='text-white fw-semibold mx-4'>{user.displayName}</span>}

                        {user && <button className="btn btn-sm btn-warning mx-2" onClick={editName}><i className="bi bi-pencil-fill"></i>
                        </button>}

                        {!user && <Link className='nav-link text-white mx-2 btn btn-sm btn-success py-1 px-2' to='/login'>Login</Link>}

                        {!user && <Link className='text-white nav-link mx-2 btn btn-sm btn-primary py-1 px-2' to="/signup">Sign up</Link>}

                        {user && <button className='mx-2 btn btn-sm btn-danger' onClick={logOut}>Log out</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar