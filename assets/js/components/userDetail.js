import formatDate from "./formateDate.js";

export default async function userDetail(userData) {
    return `<li>
                <div>
                    <h2>Mi usuario</h2>
                    <h3>Nombre y Apellido</h3>
                    <p id="userName">${userData.name} ${userData.lastName}</p>
                </div>
            </li>
            <li>
                <div class="user-data">
                    <div>
                        <h3>Correo</h3>
                        <p id="userEmail">${userData.email}</p>
                    </div>
                    <a id="changeEmailBtn" href="#" class="edit-icon" onclick="enableEdit()">
                        <img class="user-update-icon" src="./assets/img/pencil.svg">
                    </a>
                </div>
            </li>
            <li>
                <div class="user-data">
                    <div>
                        <h3>Teléfono</h3>
                        <p id="userPhone">${userData.phone}</p>
                    </div>
                    <a id="changePhoneBtn" href="#" class="edit-icon" onclick="enableEdit()">
                        <img class="user-update-icon" src="./assets/img/pencil.svg">
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <h3>Fecha de nacimiento</h3>
                    <p id="userBirthDate">${formatDate(userData.birthDate)}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>DNI</h3>
                    <p id="userDni">${userData.dni}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Dirección</h3>
                    <p id="userAdress">${userData.adress}</p>
                    <p id="userCity">${userData.city}</p>
                    <p id="userCountry">${userData.country}</p>
                </div>
            </li>
            <li>
                <div class="user-data">
                    <div>
                        <h3>Contraseña</h3>
                        <p>**********</p>
                    </div>
                    <a id="change-password-btn" class="button"  href="./change-password">¿Cambiar contraseña?</a>
                </div>
            </li>
    `;
}
//                    <button id="change-password-btn" class="button" style="width:auto;height:50px;">¿Cambiar contraseña?</button>
