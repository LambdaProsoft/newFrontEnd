import AccountApi from "./services/accountApi.js";
import TransferApi from "./services/transferApi.js";
import UserApi from "./services/userApi.js";
import logout from "./components/logout.js";
import validateToken from "./components/validateToken.js";

const render = async () => {

    //Obtener el id desde el localstorage, para asegurarnos de que inicio sesion
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Por favor, vuelve a iniciar sesión');
        window.location.href = './login.html';
    }

    // Validar que el token no expiró
    await validateToken();

    try{
        // Busco cuenta por Id de Usuario en API
        const account = await AccountApi.GetAccountByUserId(userId);
        
        // Guardo account en el localstorage
        localStorage.setItem('accountId', account.accountId);

        // actualizamos dinero
        const money = document.getElementById('money');
        money.innerHTML = `$${account.balance}`;

        // Busco transferencias por Id de Cuenta en API
        const transfers = await TransferApi.GetTransfersByAccountId(account.accountId, 1, 3);

        // actualizamos lista de transferencias con las ultimas 3
        const table = document.getElementById('lastActivity-table');
        //const recentTransfers = transfers.slice(-3);

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Última actividad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${transfers.map(transfer => `
                    <tr>
                        <td>${transfer.description}</td>
                        <td>-$${transfer.amount}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td id="allActivity">Ver toda la actividad</td>
                    <td></td>
                </tr>
            </tbody>
        `;

        // Busco User por Id en la API
        const user = await UserApi.GetUserById(userId);
        localStorage.setItem('userEmail', user.email);
        
        // actualizamos nombre
        const name = document.getElementById('wellcome');
        name.innerHTML = `¡Hola ${user.name}!`;

        document.getElementById('allActivity').addEventListener('click', redirectPage);

    } catch (error) {
        console.error('Hubo un problema al obtener los datos', error);
    }

}

window.onload = render;

function redirectPage(event){
    const accountId = localStorage.getItem('accountId');
    window.location.href = `./activity.html?accountId=${accountId}`;
}

document.getElementById('transferButtom').addEventListener('click', ()=> {
    const accountId = localStorage.getItem('accountId');
    window.location.href = `./transfer.html`;
});

logout();

