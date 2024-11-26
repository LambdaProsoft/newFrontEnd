import UserApi from "./services/userApi.js";
import validateToken from "./components/validateToken.js";
import logout from "./components/logout.js";
import alertMessage from "./components/alertMessage.js";

const render = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
                alert('Por favor, vuelve a iniciar sesión');
                window.location.href = './login.html';
        }

        await validateToken();

        document.getElementById('change-password-btn').addEventListener('click', async (event) => {
                event.preventDefault();
        
                try {
                        const password = document.getElementById("newPassword");
                        if (!password.classList.contains("valid")) {
                                console.error("Contraseña invdalida");
                                throw new Error("Su contraseña no cumple con los requisitos");
                        }
                        
                        const currentPassword = document.getElementById('currentPassword').value;
                        const newPassword = password.value;
                        const confirmedPassword = document.getElementById('confirmedPassword').value;
        
                        if (newPassword !== confirmedPassword) {
                                alert('Las contraseñas no coinciden.');
                                return;
                        }
        
                        // Obtener el correo del usuario desde el localStorage
                        const email = localStorage.getItem("userEmail");
                        if (!email) {
                            alert("Error: No se encontró el correo del usuario. Por favor, vuelve a iniciar sesión.");
                            window.location.href = "./login.html";
                            return;
                        }
        
                        const userDataUpdate = {
                                emailOrPhone : email,
                                currentPassword : currentPassword,
                                newPassword : confirmedPassword
                        }
        
                        await UserApi.ChangePassword(userDataUpdate);
        
                 } catch (error) {
                        console.error("Error al cambiar la contraseña:", error);
                        alertMessage(false, error.message);
                 }
                
        });
}


document.getElementById("newPassword").addEventListener("input", function () {
        const password = this.value;
    
        // Validaciones dinámicas
        const lengthCriteria = password.length >= 8;
        const uppercaseCriteria = /[A-Z]/.test(password);
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const allCritetia = 
                lengthCriteria == true &&
                uppercaseCriteria == true &&
                specialCharCriteria == true; //valida que todo se cumpla
        

        // Actualizar la interfaz según las validaciones
        updateChecklist("length", lengthCriteria);
        updateChecklist("uppercase", uppercaseCriteria);
        updateChecklist("special", specialCharCriteria);
        updateChecklist("newPassword", allCritetia);
    });
    
    function updateChecklist(criteriaId, isValid) {
        const criteriaElement = document.getElementById(criteriaId);
        if (isValid) {
            criteriaElement.classList.remove("invalid");
            criteriaElement.classList.add("valid");
        } else {
            criteriaElement.classList.remove("valid");
            criteriaElement.classList.add("invalid");
        }
    }


window.onload = render;
logout();