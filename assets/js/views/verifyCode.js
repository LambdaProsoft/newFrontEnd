import Loader from "../components/Loader.js";
import alertMessage from "../components/alertMessage.js";
import UserApi from "../services/userApi.js";

document.getElementById('verify-btn').addEventListener('click', async (event) =>{
    event.preventDefault();
    Loader.Show();

    const email = document.querySelector('input[type="text"]').value;
    const verificationCode = document.getElementById('codigo-verificacion').value;

    try {
        // Petición al endpoint de verificación de código
        const response = await UserApi.VerifyCode(email, verificationCode);

        if (response.ok) {
            Loader.Hidden();
            //alert('Código de verificación correcto. Inicio de sesión completado.');
            
            const token = await response.json();

            // Guardo provicionalmente el token devuelto por la API
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);

            // obtener datos del usuario desde token
            
            const userData = decode(localStorage.getItem('accessToken'));
            const userId = userData.sub; // Accede al userId
            localStorage.setItem('userId', userId);

            alertMessage(true, 'Código de verificación correcto. Inicio de sesión completado.');

            window.location.href = `./dashboard.html`;
        } else {
            Loader.Hidden();
            const errorData = await response.json();
            //alert(`Error: ${errorData.message || 'Código de verificación incorrecto'}`);
            if (errorData.message == "Invalid or expired verification code.") {
                errorData.message = "Código de verificación inválido."
            }
            alertMessage(false, errorData.message);
        }
    } catch (error) {
        console.error('Error al verificar el código:', error);
        alertMessage(false, error.message);
        //alert('Hubo un problema con la solicitud. Por favor, inténtelo de nuevo.');
    }
});

/*async function verifyCode(event) {
    
}*/

function decode(token){
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)); //Decodifica
}