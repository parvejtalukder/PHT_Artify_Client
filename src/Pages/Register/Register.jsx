import { Palette } from 'lucide-react';
import React, { useState } from 'react';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { Navigate, useNavigate } from 'react-router';
import axiosPublic from '../../Context/API/axiosPublic';

const Register = () => {

    const navigate = useNavigate();
    const { user, setLoading, CreateUserWithEmailPass, UpdateProfile, GoogleSignIn } = useContext(AuthContext);
    const registered = () => toast.success("Registration Completed!");
    const regiErr = () => toast.error("Error During Registration!");
    const passError = () => toast.error("Must contain uppercase, lowercase letter, and minimum 6 characters.");
    const [passErr, setPassErr] = useState("");

    
    const handleRegisterForm = (e) => {
        e.preventDefault();
        const Name = e.target.Name.value;
        const Email = e.target.Email.value;
        const PhotoURL = e.target.PhotoURL.value;
        const Password = e.target.Password.value;
        // const registered = () => toast("Registered Completed!");
    
        if(!validatePassword(Password)) {
            passError();
            return; 
        }
    
        CreateUserWithEmailPass(Email, Password)
            .then(res => {
                const theUser = res.user;
                UpdateProfile(Name, PhotoURL)
                    .then(async (resp) => {
                        
                        // console.log(res.user);/
                        const newUser = {
                            Token: theUser.accessToken,
                            Name: theUser.displayName,
                            Email: theUser.email,
                            Photo: theUser.photoURL,
                            Favorites: [],
                            Artworks: [],
                        }
                        try {
                            const resPnse = await axiosPublic.post('/users', newUser);
                            setLoading(false);
                        } catch (error) {
                            setLoading(false);
                            toast.error(error.message);
                        }
                        registered();
                        e.target.reset();
                            navigate('/');
                        // }, 500);
                    })
                    .catch(error => {
                        toast.error(error.message);
                        setLoading(false);
                    });
            })
            .catch(err => {
                setLoading(false);
                setPassErr(err.message);
                toast.error(err.message);
            });
    };


    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    }
    
    const FindErrPassword = (e) => {
        const pass = e.target.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    
        if(!regex.test(pass)) {
            setPassErr("Must contain uppercase, lowercase letter, and minimum 6 characters");
        } else {
            setPassErr("");
        }
    }

    const GoWithGoogle = () => {
        GoogleSignIn()
            .then(async (res) => {
                const theUser = res.user;
                // console.log(theUser);
                const newUser = {
                    Token: theUser.accessToken,
                    Name: theUser.displayName,
                    Email: theUser.email,
                    Photo: theUser.photoURL,
                    Favorites: [],
                    Artworks: [],

                }
                try {
                    const resPnse = await axiosPublic.post('/users', newUser);
                    // if(resPnse.data.exists) {
                    //     toast.info(resPnse.data.message); 
                    // } else {
                    //     toast.success(resPnse.data.message); 
                    // }
                } catch (error) {
                    setLoading(false);
                    toast.error(error.message);
                }
                registered();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.message);

            });
    };

    return (
        <div className='flex flex-col justify-center items-center py-25'>
            
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend cinzel-font">REGISTER</legend>
                <form onSubmit={handleRegisterForm}>
                <p className='text-[14px]'>Already registered on <span className='cinzel-font transition-colors font-bold text-accent'>ARTIFY</span>? <a href="/login" className='inzel-font transition-colors font-bold text-accent'>Login..</a></p>

                <label className="label">Name</label>
                <input type="text" className="input" placeholder="Name" name='Name'/>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email"  name='Email'/>

                <label className="label">PhotoURL</label>
                <input type="url" className="input" placeholder="PhotoURL" name='PhotoURL' />
                
                <label className="label">Password</label>
                <input onChange={FindErrPassword} type="password" className="input" placeholder="Password" name='Password' />
                <p className='text-red-600'>{passErr}</p>

                {/* <label className="label">Rewrite Password</label>
                <input type="password" className="input" placeholder="Rewrite Password" name='RePassword' /> */}

                {/* <p>Already hav</p> */}
                <button className="btn btn-neutral bg-accent w-full mt-4">Register</button> </form>
                <button onClick={GoWithGoogle} className="btn bg-accent text-base-100">
                  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                  Continue with Google
                </button>
                </fieldset>
            
            <ToastContainer />
        </div>
    );
};

export default Register;