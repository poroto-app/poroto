import { NextApiRequest, NextApiResponse } from "next";

export default function BasicAuth(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("WWW-authenticate", 'Basic realm="Secure Area"');
    res.statusCode = 401;
    res.end(`Auth Required.`);
}
