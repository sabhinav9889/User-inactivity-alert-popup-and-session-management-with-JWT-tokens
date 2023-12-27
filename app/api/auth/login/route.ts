import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

// import React, { useContext } from 'react';
// import {MyContext} from '../contexts/myContext';

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin@007") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  // Always check this
  const secret = process.env.JWT_SECRET || "raw123";

  const token = sign(
    {
      username,
      password,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );
  
  // const { list, addItem, removeItem } = useContext(MyContext);

  // addItem(token);
  // console.log(list);
  // const payload = {
  //   tkn: token,
  // };
  // const res = await axios.post('/api/auth/listApi', payload).then((response)=>{console.log(response)}).catch(err => console.log(err));
  const res = await fetch('http://localhost:3000/api/auth/listApi', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: token, name: username}),
  });

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized }, 
  }); 
}