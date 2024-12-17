import sidebar from "../components/sidebar.js";
import userDetail from "../components/userDetail.js";
import validateToken from "../components/validateToken.js";
import logout from "../components/logout.js";
import UserApi from "../services/userApi.js";
import formatDate from "../components/formateDate.js";

// Función para habilitar la edición de email o teléfono
function enableEdit(type) {
    // Ocultar el botón correspondiente y convertir el texto a input
    if (type === 'email') {
        document.getElementById('changeEmailBtn').style.display = 'none';
        
        const emailElement = document.getElementById('userEmail');
        const emailValue = emailElement.innerText;

        // Guardar el valor original
        emailElement.setAttribute('data-original', emailValue);

        emailElement.innerHTML = `<input type="email" id="emailInput" value="${emailValue}">`;
    }

    if (type === 'phone') {
        document.getElementById('changePhoneBtn').style.display = 'none';
        
        const phoneElement = document.getElementById('userPhone');
        const phoneValue = phoneElement.innerText;

        // Guardar el valor original
        phoneElement.setAttribute('data-original', phoneValue);

        phoneElement.innerHTML = `<input type="tel" id="phoneInput" value="${phoneValue}">`;
    }

    // Agregar botones de confirmar y cancelar
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList = 'btn-change';
    buttonsContainer.innerHTML = `
        <button id="confirmBtn" class="confirm-btn">Confirmar</button>
        <button id="cancelBtn" class="cancel-btn">Cancelar</button>
    `;

    document.getElementById('user-container').append(buttonsContainer);

    // Eventos de los botones
    document.getElementById('confirmBtn').addEventListener('click', () => updateUserInfo(type));
    document.getElementById('cancelBtn').addEventListener('click', cancelEdit);
}

window.enableEdit = enableEdit;

// Función para confirmar los cambios
async function updateUserInfo(field) {
    const userId = localStorage.getItem('userId');
    let updatedData = {};

    if (field === 'email') {
        updatedData.email = document.getElementById('emailInput').value;
    } else if (field === 'phone') {
        updatedData.phone = Number(document.getElementById('phoneInput').value); // Conversión a número
    }

    try {
        const result = await UserApi.UpdateUser(userId, updatedData);

        // Actualizar vista si el API devuelve la información
        if (result.email) {
            document.getElementById('userEmail').innerText = result.email;
        }
        if (result.phone !== undefined) {
            document.getElementById('userPhone').innerText = result.phone;
        }

        resetEditState();
    } catch (err) {
        console.error("Error al actualizar la información:", err.message);
        alert("No se pudo actualizar la información: " + err.message);
        cancelEdit(); // Restaura la vista en caso de error
    }
}


// Función para cancelar la edición
function cancelEdit() {
    const emailElement = document.getElementById('userEmail');
    const phoneElement = document.getElementById('userPhone');

    // Restaurar valores originales si existen
    if (emailElement.getAttribute('data-original')) {
        emailElement.innerText = emailElement.getAttribute('data-original');
    }

    if (phoneElement.getAttribute('data-original')) {
        phoneElement.innerText = phoneElement.getAttribute('data-original');
    }

    // Restaurar botones
    resetEditState();
}

// Función para restaurar los botones y eliminar botones de confirmación
function resetEditState() {
    // Mostrar botones de editar
    const changeEmailBtn = document.getElementById('changeEmailBtn');
    const changePhoneBtn = document.getElementById('changePhoneBtn');

    if (changeEmailBtn) changeEmailBtn.style.display = 'block';
    if (changePhoneBtn) changePhoneBtn.style.display = 'block';

    // Eliminar botones de confirmar y cancelar
    document.querySelector('.confirm-btn')?.remove();
    document.querySelector('.cancel-btn')?.remove();
}




const render = async () => {
    const navbar = document.getElementById('sidebar');
    navbar.innerHTML = await sidebar();
    logout();


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
