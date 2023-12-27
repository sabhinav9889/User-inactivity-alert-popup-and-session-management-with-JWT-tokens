import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";

export async  function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);
    return await fetch('http://localhost:3000/api/auth/listApi', {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'item' : String(token),
        },
    });
};