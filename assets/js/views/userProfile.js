import sidebar from "../components/sidebar.js";
import userDetail from "../components/userDetail.js";
import validateToken from "../components/validateToken.js";
import logout from "../components/logout.js";
import UserApi from "../services/userApi.js";
import formatDate from "../components/formateDate.js";

// Función para habilitar la edición de email y teléfono
async function enableEdit() {
    // Ocultar el botón de editar
    document.getElementById('changeEmailBtn').style.display = 'none';
    document.getElementById('changePhoneBtn').style.display = 'none';

    // Convertir <p> de email a <input>
    const emailElement = document.getElementById('userEmail');
    const emailValue = emailElement.innerText;
    emailElement.innerHTML = `<input type="email" id="emailInput" value="${emailValue}">`;

    // Convertir <p> de teléfono a <input>
    const phoneElement = document.getElementById('userPhone');
    const phoneValue = phoneElement.innerText;
    phoneElement.innerHTML = `<input type="tel" id="phoneInput" value="${phoneValue}">`;

    // Añadir botones de confirmar y cancelar
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList = 'btn-change';
    buttonsContainer.innerHTML = `
        <button id="confirmBtn" class="confirm-btn">Confirmar</button>
        <button id="cancelBtn" class="cancel-btn">Cancelar</button>
    `;

    document.getElementById('user-container').append(buttonsContainer);

    // Agregar eventos a los botones
    document.getElementById('confirmBtn').addEventListener('click', updateUserInfo);
    document.getElementById('cancelBtn').addEventListener('click', cancelEdit);
}
window.enableEdit=enableEdit;

// Función para confirmar los cambios y actualizar la información en la API
async function updateUserInfo() {
    const userId = localStorage.getItem('userId');
    const updatedEmail = document.getElementById('emailInput').value;
    const updatedPhone = document.getElementById('phoneInput').value;

    //try {
        // Llamada a la API para actualizar el usuario
        const result = await UserApi.UpdateUser(userId, {
            email: updatedEmail,
            phone: updatedPhone
        });

        // Actualizar los elementos en la página
        document.getElementById('userEmail').innerHTML = result.email;
        document.getElementById('userPhone').innerHTML = result.phone;
        console.log(result);
        // Restaurar la vista original
        document.getElementById('changeEmailBtn').style.display = 'block';
        document.getElementById('changePhoneBtn').style.display = 'block';
        document.querySelector('.confirm-btn').remove();
        document.querySelector('.cancel-btn').remove();

        //window.location.href="./dashboard.html";

    /*} catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
        alert("Hubo un problema al actualizar la información.");
        window.location.href="./UserProfile copy.html";
    }*/
}

// Función para cancelar la edición y restaurar la vista original
async function cancelEdit() {
    document.getElementById('userEmail').innerHTML = document.getElementById('emailInput').value;
    document.getElementById('userPhone').innerHTML = document.getElementById('phoneInput').value;

    // Mostrar nuevamente los botones de editar
    document.getElementById('changeEmailBtn').style.display = 'inline';
    document.getElementById('changeTelBtn').style.display = 'inline';

    // Eliminar los botones de confirmar y cancelar
    document.getElementById('confirm-btn').remove();
    document.getElementById('cancel-btn').remove();
}


// Redirigir a la página de cambio de contraseña
//document.getElementById('change-password-btn').addEventListener('click', () => {
//    window.location.href = './change-password.html';
//});


const render = async () => {
    const navbar = document.getElementById('sidebar');
    navbar.innerHTML = await sidebar();


    //Obtener el id desde el localstorage, para asegurarnos de que inicio sesion
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Por favor, vuelve a iniciar sesión');
        window.location.href = './login.html';
    }

    // validar que el token no expiro
    await validateToken();

    const userData = await UserApi.GetUserById(userId);
    const data = document.getElementById('detail');
    data.innerHTML = await userDetail(userData);

}
window.onload = render;
logout();