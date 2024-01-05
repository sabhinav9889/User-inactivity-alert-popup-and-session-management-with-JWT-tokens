"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";
import { siteKey} from "@/constants";

export default function captchaWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const recaptchaKey: string | undefined = siteKey;
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    );
}