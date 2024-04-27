import axios from "axios";

export class AuthApi {
    async sessionLogin({ idToken }: { idToken: string }) {
        await axios.post(`${process.env.PLANNER_API_ENDPOINT}/session/login`, {
            id_token: idToken,
        });
    }

    async sessionLogout() {
        await axios.post(`${process.env.PLANNER_API_ENDPOINT}/session/logout`);
    }
}
