import axios from 'axios';
import React from 'react'
import { FiLogIn } from "react-icons/fi";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
    const[email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');

    const onSubmitHandler=async(e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+'/api/user/admin-login',{email,password})
            if(response.data.success){
                toast.success(response.data.message);
                setToken(response.data.token);
            }else{
                toast.error(response.data.message);
            }
                         
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-500 px-10 py-10 text-white rounded-2xl'>
                <h1 className='text-3xl font-bold mb-5'>Admin Panel</h1>

                <form onSubmit={onSubmitHandler}>

                    <div>
                        <p>Email Address</p>
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='email please' required className='w-full rounded-md px-3 py-2 text-gray-800 mb-2 border' />
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='password please' required className='w-full rounded-md px-3 py-2 text-gray-800 mb-2 border' />
                    </div>
                    <div className='flex w-fit items-center justify-center mt-2 bg-red-400 text-whitespace-nowrap text-white rounded- hover:bg-red-500 cursor-pointer rounded-xl px-3 py-2'>
                        <button type="submit" value={password} className='w-fit flex items-center gap-2 cursor-pointer'><FiLogIn /> Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login