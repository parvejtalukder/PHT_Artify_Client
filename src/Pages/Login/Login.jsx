import { Palette } from 'lucide-react';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const sendTo = useNavigate();
    const {user, setLoading, GoogleSignIn, SignInWithEmailPass} = useContext(AuthContext);
    const err = () => toast.error("Error While Logging In!");

    const handleLoginForm = (e) => {
        e.preventDefault();
        console.log("Login(); Called...")
        const Email = e.target.Email.value;
        const Pass = e.target.Password.value;
        if (!Pass || !Email) {
            toast.error("Empty form can't be submitted..")
            return;
        }
        // if (!Email) 
        SignInWithEmailPass(Email, Pass)
        .then(res => {
            toast("Logged In!");
            sendTo("/");
            // console.log(res.user.accessToken);
        })
        .catch(err => {
            toast.error(err.message);
            sendTo("/");
            setLoading(false);
            return;
            // err();
        })
    }

    const GoWithGoogle = async () => {
      try {
        await GoogleSignIn();
        toast.success("Logged In!");
        sendTo("/");
        // return;
      } catch (error) {
        // err();
        toast.error(error.message);
        setLoading(false);
        return;
        // sendTo("/");
      }
    };

    return (
        <div className='flex flex-col justify-center items-center py-25'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <form onSubmit={handleLoginForm}>
                <legend className="fieldset-legend cinzel-font">LOGIN</legend>
                <p className='text-[14px]'>New to <span className='cinzel-font transition-colors font-bold text-accent'>ARTIFY</span>? <a href="/register" className='cinzel-font transition-colors font-bold text-accent'>Register</a> first...</p>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" name='Email'/>
                
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" name='Password' />
                {/* <p>Already hav</p> */}
                <button className="btn w-full btn-neutral bg-accent mt-4">Login</button>
            </form>
            <button onClick={GoWithGoogle} className="btn bg-accent text-base-100">
                  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                  Login with Google
            </button>
            </fieldset>
            <ToastContainer/>
        </div>
    );
};

export default Login;
