"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// import {grecaptha} from '@google-cloud/recaptcha-enterprise';
// import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      if (!executeRecaptcha) {
        console.log("not available to execute recaptcha");
        return;
      }

      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

      console.log(gRecaptchaToken);

      ///
      const data = {
        token : gRecaptchaToken
      }
      
      const response = await axios.post("/api/auth/verifyRecaptha",data);

      if (response?.data?.success === true) {
        console.log(`Success with score: ${response?.data?.score}`);
        alert("human");
      } else {
        console.log(`Failure with score: ${response?.data?.score}`);
      }
    } catch (e) { 
      const error = e as AxiosError;
      console.log(error);
      alert("bot");
    }
    try {
      const payload = {
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
      };
      const { data } = await axios.post("/api/auth/login", payload);

      alert(JSON.stringify(data));

      // redirect the user to /dashboard
      push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <main>
      <h1>Nextjs authentication JWT verify http cookie only</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded border-black"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Submit
        </button>
        <button
          type="submit"
          className="p-2 bg-blue-600 text-orange w-fit rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
