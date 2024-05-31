import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // poroto.appの場合はkomichi.appにリダイレクト
    // TODO: 2024年10月以降に削除
    const { hostname } = req.nextUrl;
    if (hostname === "poroto.app") {
        const url = new URL(
            `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}/`
        );
        return NextResponse.redirect(url, 301);
    }

    // staging環境でのみBasic認証を行う
    if (process.env.APP_ENV !== "staging") {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get("authorization");
    const url = req.nextUrl;

    // robots.txtはBasic認証をスキップ
    if (["/robots.txt"].includes(url.pathname)) {
        return NextResponse.next();
    }

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
