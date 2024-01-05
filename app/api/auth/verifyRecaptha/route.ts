import { NextResponse } from "next/server";
import axios from "axios";
import {secretKey} from "@/constants";

export async function POST(request: Request, response: Response) {

    const postData = await request.json();

    const { token } = postData;

    let res;

    const formData = `secret=${secretKey}&response=${token}`;

    try {
        res = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

    } catch (e) {
        return NextResponse.json({ success: false })
    }

    if (res && res.data?.success && res.data?.score > 0.5) {
        console.log("res.data?.score:", res.data?.score);

        return NextResponse.json({
            success: true,
            score: res.data.score,
        });
    } else {
        return NextResponse.json({ success: false });
    }
}