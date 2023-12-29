"use client"
import React, { use, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {times, detTm} from '../../constants';
import 'tailwindcss/tailwind.css';


const popUp: React.FC = ()=>{
    const { push } = useRouter();
    const [ren, setRen] = useState(true);
    const [count, setCount] = useState(60);
    useEffect(() =>{
        const intervalId = setInterval(() => {
            setCount(count => count - 1);
          }, 1000);
          return () => clearInterval(intervalId);
    },[]);
    useEffect(() =>{
        if(count===0){ 
            detTm();
            axios.get('http://localhost:3000/api/auth/logout');
            push('/');
            return;
        }
    });
    function func(){
        detTm();
        push('/dashboard');
        return;
    }
    return(
        <div className='h-64 w-96 p-4 bg-green-500 text-whiteflex items-center justify-center absolute top-44 left-1/3 rounded-md'>    
            <p>You are inactivity for some period of time</p>
    <p>Please click to continue or you will be logout within <span className='text-red-500 relative top-20 left-1/4'>{count} seconds</span></p>
            <button className="w-24 h-8 bg-blue-500 relative top-32 left-1/3 hover:bg-orange-700 rounded-md" type='button' onClick={func} >Continue</button>
        </div>
    )
}

export default popUp;