import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// import React, { useContext } from 'react';
// import {MyContext} from '../contexts/myContext';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  // const { list, addItem, removeItem } = useContext(MyContext);
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "raw123";
  // function forList(token: string){
  //   for(let i=0; i<list.length; i++){
  //     if(list[i] === token) return true;
  //   }
  //   return false;
  // }
  try {
    verify(value, secret);
    const response = {
      user: "Super Top Secret User",
    };
    // if(!forList(String(token))) throw new Error("This is a custom error message.");
    // const resl = await axios.get('/api/auth/listApi').catch(err => console.log(err));
    // console.log(resl);
    // if(resl.status==400) throw new Error("This is a custom error message.");
    // const res = await fetch('http://localhost:3000/api/auth/listApi', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ item: value }), // Include your data in the body
    // });
    // console.log(value);
    // const res = await fetch('http://localhost:3000/api/auth/listApi', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'item': value,
    //   },
    // });
    // if(res.status === 401) throw new Error;
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
