import React, { useRef, useState } from 'react';
import { auth } from '../firebase.init';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState('')
    const emailRef = useRef()

    const handleLogin = e =>{
        e.preventDefault()
        const email = e.target.email.value;
        const  password = e.target.password.value;
        console.log(email,password)

        //reset status............
        setSuccess(false)
        setError('')
        //login user data from firebase data..
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            

            //email verification required ....
            if(!result.user.emailVerified){
                setError('Please verify your email address')
            }
            else{
                setSuccess(true)
            }
        })
        .catch(error =>{
            console.log(error.message)
            setError(error.message)
        })
    }
// password forger .................
    const handleForgetPassword = () => {
        console.log('forget password',emailRef.current.value)
        const email = emailRef.current.value;

        if(!email){
            console.log('Please provide a valid Email')
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                toast.error('Password reset email send,Please check your email')
            })
        }
    }
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" ref={emailRef} name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        <label onClick={handleForgetPassword} className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                {
                    success && <p className='text-green-700 font-semibold ml-6'>login successful</p>
                }
                {
                    error && <p className='text-red-700 font-semibold ml-6'>login field</p>
                }

                <p className='ml-5 mb-5'>Don't have an account ? Please <Link to='/register2' className='text-purple-700 underline font-semibold'>Sing Up</Link></p>
            </div>
        </div>
    );
};

export default Login;