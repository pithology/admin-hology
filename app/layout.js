import Script from "@/components/script";
import React from 'react'
import "@/styles/global.css";
import basepath from "@/components/utils/path";

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" type="image/png" sizes="32x32" href={`${basepath}/favicon.png`}/>
            <link href="https://fonts.gstatic.com" rel="preconnect"/>
            <link
                href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
                rel="stylesheet"/>
        </head>
        <body>
        {children}
        <Script></Script>
        </body>
        </html>
    )
}
