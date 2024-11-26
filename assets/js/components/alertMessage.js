export default function transferAlert(condition, message) {
    const alertSection = document.getElementById("customAlert");

    if(condition){
        alertSection.innerHTML =  `<div class="alert-box">
                    <img class="alert-icon" src="assets/img/Succes.png"></img>
                    <div id="alert-info" class="alert-info">
                        <h2 class="alert-title">Éxito!</h2>
                        <p class="alert-message">${message}</p>
                    </div>
                    <button class="alert-button" id="alertBtn" >Aceptar</button>
                </div>
        `;
    }else{
        alertSection.innerHTML =  `<div class="alert-box">
                    <img class="alert-icon" src="assets/img/Error.png"></img>
                    <div id="alert-info" class="alert-info">
                        <h2 class="alert-title">Error!</h2>
                        <p class="alert-message">${message}</p>
                    </div>
                    <button class="alert-button" id="alertBtn" >Aceptar</button>
                </div>
        `;
    }
    alertSection.style.display = 'flex';

    document.getElementById('alertBtn').addEventListener('click', () => {
        const alertBox = document.getElementById("customAlert");
        alertBox.style.display = "none";
        //window.location.href = "main-menu.html";
    })
}