import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest) {
    const cookies = request.cookies.get("company_access_token")
    const urlrequest = request.url.includes("/dashboard")
    if (urlrequest && !cookies) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}


export const config = {
    matcher: [
        '/dashboard/:path'
    ]
}