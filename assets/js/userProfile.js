import validateToken from "./components/validateToken.js";
import logout from "./components/logout.js";
import UserApi from "./services/userApi.js";
import formatDate from "./components/formateDate.js";

const render = async () => {
    //Obtener el id desde el localstorage, para asegurarnos de que inicio sesion
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Por favor, vuelve a iniciar sesión');
        window.location.href = './login.html';
    }

    // validar que el token no expiro
    await validateToken();

    try{
        // Busco User por Id en la API
        const user = await UserApi.GetUserById(userId);

        // actualizamos datos
        document.getElementById('nameUser').innerHTML = `${user.name} ${user.lastName}`;
        document.getElementById('emailUser').innerHTML = `${user.email}`;
        document.getElementById('telUser').innerHTML = `${user.phone}`;
        document.getElementById('dateUser').innerHTML = `${formatDate(user.birthDate)}`;
        document.getElementById('dniUser').innerHTML = `${user.dni}`;
        document.getElementById('dirUser').innerHTML = `${user.adress}`;

    } catch (error) {
        console.error('Hubo un problema al obtener los datos', error);
    }

}


// Función para habilitar la edición de email y teléfono
function enableEdit() {
    // Ocultar el botón de editar
    document.getElementById('changeEmailBtn').style.display = 'none';
    document.getElementById('changeTelBtn').style.display = 'none';

    // Convertir <p> de email a <input>
    const emailElement = document.getElementById('emailUser');
    const emailValue = emailElement.innerText;
    emailElement.innerHTML = `<input type="email" id="emailInput" value="${emailValue}">`;

    // Convertir <p> de teléfono a <input>
    const phoneElement = document.getElementById('telUser');
    const phoneValue = phoneElement.innerText;
    phoneElement.innerHTML = `<input type="tel" id="phoneInput" value="${phoneValue}">`;

    // Añadir botones de confirmar y cancelar
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList = 'btn-change';
    buttonsContainer.innerHTML = `
        <button id="confirmBtn" class="confirm-btn">Confirmar</button>
        <button id="cancelBtn" class="cancel-btn">Cancelar</button>
    `;

    document.querySelector('.user-container').append(buttonsContainer);

    // Agregar eventos a los botones
    document.getElementById('confirmBtn').addEventListener('click', updateUserInfo);
    document.getElementById('cancelBtn').addEventListener('click', cancelEdit);
}

// Función para confirmar los cambios y actualizar la información en la API
async function updateUserInfo() {
    const userId = localStorage.getItem('userId');
    const updatedEmail = document.getElementById('emailInput').value;
    const updatedPhone = document.getElementById('phoneInput').value;

    try {
        // Llamada a la API para actualizar el usuario
        const result = await UserApi.UpdateUser(userId, {
            email: updatedEmail,
            phone: updatedPhone
        });

        // Actualizar los elementos en la página
        document.getElementById('emailUser').innerHTML = result.email;
        document.getElementById('telUser').innerHTML = result.phone;

        // Restaurar la vista original
        document.getElementById('changeEmailBtn').style.display = 'inline';
        document.getElementById('changeTelBtn').style.display = 'inline';
        document.querySelector('.confirm-btn').remove();
        document.querySelector('.cancel-btn').remove();

    } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
        alert("Hubo un problema al actualizar la información.");
        window.location.href="./UserProfile.html";
    }
}

// Función para cancelar la edición y restaurar la vista original
function cancelEdit() {
    document.getElementById('emailUser').innerHTML = document.getElementById('emailInput').value;
    document.getElementById('telUser').innerHTML = document.getElementById('phoneInput').value;

    // Mostrar nuevamente los botones de editar
    document.getElementById('changeEmailBtn').style.display = 'inline';
    document.getElementById('changeTelBtn').style.display = 'inline';

    // Eliminar los botones de confirmar y cancelar
    document.querySelector('.confirm-btn').remove();
    document.querySelector('.cancel-btn').remove();
}

// Redirigir a la página de cambio de contraseña
document.querySelector('.change-password-btn').addEventListener('click', () => {
    window.location.href = './change-password.html';
});


document.getElementById('changeEmailBtn').addEventListener('click', enableEdit);
document.getElementById('changeTelBtn').addEventListener('click', enableEdit);

window.onload = render;
logout();