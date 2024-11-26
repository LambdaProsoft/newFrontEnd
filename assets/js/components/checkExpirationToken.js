import decodeJWT from "./decodeJWT.js";

export default function checkExpirationToken(){
    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert("No se ha detectado autorización para acceder a los datos.");
        localStorage.clear();
        window.location.href = './login.html';
    }

    const userData = decodeJWT(token);
    const exp = userData.exp;
    const currentTime = Math.floor(Date.now() / 1000); //Tiempo actual

    return currentTime >= exp; // indica si el token ya expiró
}