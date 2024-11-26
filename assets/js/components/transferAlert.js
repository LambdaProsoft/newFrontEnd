export async function transferAlert(message,information) {

    if(message == 'succes'){
        return `<div class="alert-box">
                    <img class="alert-icon" src="assets/img/Succes.png"></img>
                    <div id="alert-info" class="alert-info">
                        <h2 class="alert-title">Éxito!</h2>
                        <p class="alert-message">La operación se completó correctamente.</p>
                    </div>
                    <button class="alert-button" onclick="closeAlert()">Aceptar</button>
                </div>
        `;
    }else{
        return `<div class="alert-box">
                    <img class="alert-icon" src="assets/img/Error.png"></img>
                    <div id="alert-info" class="alert-info">
                        <h2 class="alert-title">Error!</h2>
                        <p class="alert-message">${information}</p>
                    </div>
                    <button class="alert-button" onclick="closeAlert()">Aceptar</button>
                </div>
        `;
    }
    ;
}