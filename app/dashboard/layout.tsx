"use client";
import React from "react";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import {sessionIdToUserMap} from '.././../service/service';
import Link from "next/link";
// import {times, setTm} from '../../constants';
// import { destroyCookie } from 'nookies';
// import { cookies } from "next/headers"
// import { COOKIE_NAME } from "@/constants";
// import React, { useContext } from 'react';
// import {MyContext} from '../contexts/myContext';

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [ren, setRend] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        push("/");
        return;
      }
      setIsSuccess(true);
      setRend(true);
    })();
  },[]);
  let inactivityTimeout: NodeJS.Timeout;
  const handleLogout = async() => {
      setRend(true);
      // alert('User logged out due to inactivity');  // Pop up
      // setTm();
      push('/popup');
  };
  
  const resetInactivityTimer = () => {    
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(handleLogout, 1 * 10 * 1000); // 10 seconds
  };

  const handleUserActivity = () => {
    resetInactivityTimer();
  };

    useEffect(() => {
      // Attach event listeners on component mount
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('click', handleUserActivity);
      document.addEventListener('onmouseover', handleUserActivity);
      document.removeEventListener('hover', handleUserActivity);

      // Initialize the inactivity timer on component mount
      resetInactivityTimer();

      // Detach event listeners on component unmount  
      // return () => {
      //   document.removeEventListener('mousemove', handleUserActivity);
      //   document.removeEventListener('click', handleUserActivity);
      //   document.removeEventListener('keypress', handleUserActivity);
      //   document.removeEventListener('hover', handleUserActivity);
      // };
    }, []); // Empty dependency array ensures that this effect runs once on mount

  if (!isSuccess) {
    return <p>Loading...</p>;
  }
  
  return (
    <main>
      <header>
        <Link href='/dashboard'>
          Dashboard
        </Link>
        <Link href='/dashboard/settings'>
          Settings
        </Link>
      </header>
      {children}
    </main>
  );
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    // console.log(sessionIdToUserMap);
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
