import { transferAlert } from "../components/transferAlert.js"
import Loader from "../components/Loader.js";
import UserApi from "../services/userApi.js";
import alertMessage from "../components/alertMessage.js";
import accountTypeApi from "../services/accountTypeApi.js";
import typeCurrencyApi from "../services/typeCurrency.js";

async function closeAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.style.display = "none";
}
window.closeAlert = closeAlert;

const render = async () => {
    Loader.Show();
    //Cargar opciones
    loadAccountType();
    loadCurrencyType();
    Loader.Hidden();
}

let selectedAccountTypeId; 

document.querySelector('.submit-btn').addEventListener('click', async (event) => {
event.preventDefault();

const alertSection = document.getElementById("customAlert");
    // Recupera el objeto userData del localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Verifica que userData exista en el localStorage
    if (!userData) {
        alertSection.innerHTML = await transferAlert("error","Faltan completar el formulario de registro");
        alertSection.style.display = 'flex';
        window.location.href = 'register.html';
        return;
    }

    const currency = document.getElementById('currency').value;

    if (!selectedAccountTypeId || !currency) {
        alertSection.innerHTML = await transferAlert("error","Faltan completar campos");
        alertSection.style.display = 'flex';
        return;
    }

        userData.accountType = selectedAccountTypeId;  // Usamos el ID de cuenta seleccionado
        userData.currency = currency;

        try {
            // Petición al endpoint de registro de usuario
            console.log(userData);
            const response = await UserApi.CreateUser(userData);
            if (response.ok) {
                alertMessage(true, "Bienvenido a UnajPay");
                document.getElementById('alertBtn').addEventListener('click', () => {
                    window.location.href = "login.html";
                });
            } else {
                const errorData = await response.json();
                if (errorData.message == "A user with this email already exist") {
                    errorData.message = "Ya existe una cuenta con ese correo.";
                }
                alertSection.innerHTML = await transferAlert("error",errorData.message);
                alertSection.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un problema con la solicitud. Por favor, inténtelo de nuevo.');
        }
});


async function loadAccountType() {
    const accountTypeButtonsContainer = document.getElementById("accountTypeButtons");
    
    try {
        const accountTypes = await accountTypeApi.GetAccountTypes();

        const translations = {
            "Savings bank": "Cuenta de ahorros",
            "Salary Account": "Cuenta de sueldo",
            "Checking Account": "Cuenta corriente",
        };

        accountTypes.forEach(type => {
            const button = document.createElement("button");
            button.classList.add("account-type-button");

            button.type = "button";
            
            // Traducir el nombre del tipo de cuenta
            const translatedName = translations[type.name] || type.name;
            
            button.textContent = translatedName;
            button.setAttribute("data-id", type.id); // Usamos el ID del tipo de cuenta como un atributo de datos

            button.addEventListener("click", function() {
                // Marcar el botón como seleccionado
                const selectedButton = document.querySelector(".account-type-button.selected");
                if (selectedButton) {
                    selectedButton.classList.remove("selected");
                }
                button.classList.add("selected");

                // Guardar el ID seleccionado
                selectedAccountTypeId = type.id;
            });

            accountTypeButtonsContainer.appendChild(button);
        });
    } catch (error) {
        console.error("Hubo un problema al obtener los tipos de cuenta:", error);
    }
}


async function loadCurrencyType() {
    const currencyType = document.getElementById("currency");
    
    try {
        const currencies = await typeCurrencyApi.GetTypeCurrency();

        currencies.forEach(type => {
            const option = document.createElement("option");
            option.value = type.id;
            option.textContent = type.name;
            currencyType.appendChild(option);
        });
    } catch (error) {
        console.error("Hubo un problema al obtener los tipos de moneda:", error);
    }

}

window.onload = render;