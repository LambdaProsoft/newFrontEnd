import { transferAlert } from "../components/transferAlert.js"

async function closeAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.style.display = "none";
}
window.closeAlert = closeAlert;

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario

    const userName = document.getElementById('userName').value;
    const userLastName = document.getElementById('userLastName').value;
    const email = document.getElementById('userEmail').value;
    const dni = document.getElementById('userDni').value;
    const country = document.getElementById('UserCountry').value;
    const city = document.getElementById('UserCity').value;
    const adress = document.getElementById('userAddress').value;
    const birthDate = document.getElementById('date').value;
    const phone = document.getElementById('userTel').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmedPassword').value;

    const alertSection = document.getElementById("customAlert");

    if (!userName || !userLastName || !email || !dni || !country || !city || !adress || !birthDate || !phone || !password || !confirmPassword) {
        alertSection.innerHTML = await transferAlert("error","Faltan completar campos");
        alertSection.style.display = 'flex';
        return;
    }

    const birthDateObject = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObject.getFullYear();
    const monthDiff = today.getMonth() - birthDateObject.getMonth();
    const dayDiff = today.getDate() - birthDateObject.getDate();
    const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
    if (isUnder18) {
        alertSection.innerHTML = await transferAlert("error", "Debes tener al menos 18 años para registrarte");
        alertSection.style.display = 'flex';
        return;
    }

    if (password !== confirmPassword) {
        alertSection.innerHTML = await transferAlert("error","Las contraseñas no coinciden");
        alertSection.style.display = 'flex';
        return;
    }

    const pw = document.getElementById("password");
    if (!pw.classList.contains("valid")) {
        alertSection.innerHTML = await transferAlert("error","Las contraseña no cumple los requisitos");
        alertSection.style.display = 'flex';
        return
    }

    if (!/^\d+$/.test(dni)) {
        alertSection.innerHTML = await transferAlert("error","El DNI es invalido");
        alertSection.style.display = 'flex';
        return;
    }

    if (!/^\d+$/.test(phone)) {
        alertSection.innerHTML = await transferAlert("error","El numero de telefono es invalido");
        alertSection.style.display = 'flex';
        return;
    }

    // Crea un objeto con los datos del usuario
    const userData = {
        name: userName,
        lastName: userLastName,
        email: email,
        dni: dni,
        country: country,
        city: city,
        password: password,
        adress: adress,
        birthDate: birthDate,
        phone: phone
    };

    // Guardar el objeto userData en localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

     // Redirigir a la siguiente página para completar el registro
     window.location.href = 'account-selection.html';

});


document.getElementById("password").addEventListener("input", function () {
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
    updateChecklist("password", allCritetia);
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
