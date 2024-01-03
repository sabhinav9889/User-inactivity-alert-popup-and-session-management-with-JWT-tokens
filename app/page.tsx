"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
// import {grecaptha} from '@google-cloud/recaptcha-enterprise';
// import { useEffect } from "react";


export default function Home() {
  const { push } = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      grecaptcha.enterprise.ready(async () => {
        grecaptcha
          .enterprise
          .execute('6LcaqkApAAAAAGadmPPxtME3R4lLUGqjKI6v_yzP', { action: 'LOGIN' })
          .then(async(token) => {
            // Send the token to your backend for assessment
            // console.log(token);
            const {data} = await axios.post("http://localhost:3000/api/auth/verifyRecaptha", {tokn : token});
            alert(JSON.stringify(data));
          });
      });
    } catch(e){
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
