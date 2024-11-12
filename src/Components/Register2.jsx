import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register2 = () => {

    const [errorMassage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSingUp = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const trams = e.target.trams.checked;

        //reset error and status
        setErrorMessage('')
        setSuccess(false)
        //checkbox condition
        if(!trams){
            setErrorMessage('Please accepts our trams and conditions')
            return;
        }

        //password length more then 6 characters
        if (password.length < 6) {
            setErrorMessage('password more then 6 characters longer')
            return
        }

        // password validation with regular expression 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase,one lower case and one special character or 8 character longer')
            return
        }


        //create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true)

                //send verification email address
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('verification email send')
                })
            })
            .catch((error) => {
                console.log(error.message)
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }
    
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-5">
                <form onSubmit={handleSingUp} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder="password"
                            className="input input-bordered" required />
                        <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-12 right-4'>
                            {
                                showPassword ? <FaEye></FaEye> : <FaEyeSlash />
                            }
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <div className="form-control">
                            <label className="cursor-pointer label  justify-start">
                            <input type="checkbox" name='trams' className="checkbox checkbox-accent" />

                                <span className="label-text ml-2">Accepts out trams and condition</span>

                            </label>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                {
                    errorMassage && <p className='text-red-600'>{errorMassage}</p>
                }
                {
                    success && <p className='text-green-600 '>sing up is successful</p>
                }
                <p className='ml-5 mb-5'>Already have an account?Please <Link to='/login' className='underline font-semibold'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register2;