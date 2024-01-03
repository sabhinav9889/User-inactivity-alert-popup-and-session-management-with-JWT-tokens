// import { COOKIE_NAME } from "@/constants";
// import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {setValue, getValue, removeValue} from '../../../../service/service';

export async function PUT(request: Request) {
    const body = await request.json();
    const {item, name} = body;
    // lis = item;
    setValue(item, name);
    // lis.push(item);
    // console.log(lis);
    // res.status(200).send("Token setup");
    return NextResponse.json(
        {
          message: "Token setup successfully",
        },
        {
          status: 200,
        }
    );
}

export async function POST(request: Request){
    const item = request.headers.get('item');
    const res = await getValue(String(item));
    if(res==null){
      return NextResponse.json(
          {
            message: "Unauthorized",
          },
          {
            status: 401,
          }
      );
    }
    return NextResponse.json(
        {
        message: "authorized",
        },
        {
        status: 200,
        }
    );
}

export async function DELETE(request: Request){
    const item = request.headers.get('item');
    removeValue(String(item));
    return NextResponse.json(
        {
          message: "Remove token successfully",
        },
        {
          status: 200,
        }
    );
}

// export async function handler(req:any, res:any){
//     if(req.method=='GET'){
//       const cookieStore = cookies();
//       const token = cookieStore.get(COOKIE_NAME);
//       for(let i=0; i<lis.length; i++) {
//           if(lis[i]==String(token)){
//               return res.status(200).send("Token found");
//           }
//       }
//       return res.status(400).send("Token not found");
//     }
//     else if(req.method=='POST'){
//       console.log('yes');
//       const body = await req.json();
//       const {tkn} = body;
//       lis.push(tkn);
//       return res.status(200).send("Token setup");
//       // return res.status(400).send("Token not found");
//     }
//     else if(req.method=='DELETE'){
//       const cookieStore = cookies();
//       const token = cookieStore.get(COOKIE_NAME);
//       let str = String(token);
//       lis = lis.filter(item=> item !== str);
//       return res.status(200).send("Remove the token");
//     }
// }