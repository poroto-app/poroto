import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // staging環境でのみBasic認証を行う
    if (process.env.APP_ENV !== "staging") {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get("authorization");
    const url = req.nextUrl;

    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");

        const basicUserName = process.env.BASIC_AUTH_USERNAME;
        const basicPassword = process.env.BASIC_AUTH_PASSWORD;

        if (user === basicUserName && pwd === basicPassword) {
            return NextResponse.next();
        }
    }

    url.pathname = "/api/basic_auth";

    return NextResponse.rewrite(url);
}
