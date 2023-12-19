"use client";

import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { destroyCookie } from 'nookies';

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        push("/");
        return;
      }

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [push]);

  let inactivityTimeout: NodeJS.Timeout;
  const handleLogout = () => {
    // Perform logout or other actions (e.g., redirect to the login page)
      alert('User logged out due to inactivity');  // Pop up
      localStorage.removeItem('OurSiteJWT');
      function deleteCookie(name:'OurSiteJWT') {  
        destroyCookie(null, 'OurSiteJWT', { path: '/' });
        // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      // Example: Assume your JWT token is stored in a cookie named 'jwtToken'
      deleteCookie('OurSiteJWT');
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

    // Initialize the inactivity timer on component mount
    resetInactivityTimer();

    // Detach event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      document.removeEventListener('hover', handleUserActivity);
    };
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
