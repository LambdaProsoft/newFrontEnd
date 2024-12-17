import alertMessage from "../components/alertMessage.js";
import { UrlUser } from "../constants.js";

const logIn = async (requestData) => {
    try {
        let response = await fetch(`${UrlUser}User/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(requestData)
        });
    return response;
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
}

export const verifyCode = async (email, verificationCode) => {
    try {
        const response = await fetch(`${UrlUser}User/verify-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verificationCode }),
        });
        return response;
    } catch (error) {
        console.error('Error en la verificación del código:', error);
        throw error; 
    }
};

const createUser = async (request) => {
    try {
        let response = await fetch(`${UrlUser}User/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });
        return response;
    } catch (error) {
        console.error("Hubo un problema al crear el usuario:", error);
    }
}

const getUserById = async (userId) => {
    try {
        let result = [];
        let response = await fetch(`${UrlUser}User/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
            
        if(response.ok){
            result = await response.json();
        }
    return result;

    } catch (error) {
        console.error("Hubo un problema al obtener el Usuario:", error);
    }
}

const refreshToken = async (request) => {
    try {
        let result = [];
        let response = await fetch("https://localhost:7160/api/User/refresh-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });
    
        if (response.ok) {
            result = await response.json();
            console.log("Token actualizado.");
        }
        return result;
    } catch (error) {
        console.error("Hubo un problema al actualizar el token:", error);
    }
}

const updateUser = async (userId, userDataUpdate) => {
    try {
        const queryParams = new URLSearchParams({
            userId : userId
        });

        let result = [];
        let response = await fetch(`https://localhost:7160/api/User?${queryParams.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDataUpdate)
        });
    
        if (response.ok) {
            result = await response.json();
            console.log("Usuario actualizado.");
            alert("Usuario actualizado con éxito.");
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        return result;
    } catch (error) {
        console.error("Hubo un problema al actualizar los datos del usuario:", error);
        alert("No se pudo actualizar los datos.");
    }
}

const changePassword = async (userDataUpdate) => {
    try {
        let result = [];
        let response = await fetch(`https://localhost:7160/api/User/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDataUpdate)
        });
    
        if (response.ok) {
            result = await response.json();
            console.log("Usuario actualizado.");
            alertMessage(true, result.message);
            
        } else if (response.status == 400){
            result = await response.json();
            console.log("Error 400: ", result.message);
            alertMessage(false, result.message);

        } else {
            console.error("Hubo un problema al actualizar los datos del usuario:", error);
            throw new Error("No se pudo actualizar los datos.");
        }
        
        return result;
    } catch (error) {
        console.error("Hubo un problema al cambiar la contraseña", error);
        alert("No se pudo actualizar los datos.");
    }
}

const UserApi = {
    Login : logIn,
    VerifyCode: verifyCode,
    CreateUser: createUser,
    GetUserById : getUserById,
    RefreshToken : refreshToken,
    UpdateUser : updateUser,
    ChangePassword : changePassword
}
export default UserApi;