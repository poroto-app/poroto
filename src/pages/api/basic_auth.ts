import { NextApiRequest, NextApiResponse } from "next";

export default function BasicAuth(req: NextApiRequest, res: NextApiResponse) {
    if(process.env.APP_ENV !== "staging") {
        // Staging環境以外ではBasic認証を行わない(404を返す)
        res.statusCode = 404;
        res.end();
        return;
    }

    res.setHeader("WWW-authenticate", 'Basic realm="Secure Area"');
    res.statusCode = 401;
    res.end(`Auth Required.`);
}
