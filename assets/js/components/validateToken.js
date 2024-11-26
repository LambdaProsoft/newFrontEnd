import checkExpirationToken from "./checkExpirationToken.js";
import UserApi from "../services/userApi.js";

export default async function validateToken(){
    if (checkExpirationToken()) {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const request = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        // Actualizamos tokens
        const currentToken = await UserApi.RefreshToken(request);

        localStorage.setItem('accessToken', currentToken.accessToken);
        localStorage.setItem('refreshToken', currentToken.refreshToken);
    }
}