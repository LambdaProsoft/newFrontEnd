import sidebar from "../components/sidebar.js";
import activity from "../components/transfers.js";
import AccountApi from "../services/accountApi.js";
import TransferApi from "../services/transferApi.js";
import UserApi from "../services/userApi.js";
import logout from "../components/logout.js";
import validateToken from "../components/validateToken.js";

const render = async () => {
    const navbar = document.getElementById('sidebar');
    navbar.innerHTML = await sidebar();

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Por favor, vuelve a iniciar sesión');
        window.location.href = './login.html';
    }

    // Validar que el token no expiró
    await validateToken();

        // Busco cuenta por Id de Usuario en API
        const account = await AccountApi.GetAccountByUserId(userId);
        
        // Guardo account en el localstorage
        localStorage.setItem('accountId', account.accountId);

        // actualizamos dinero
        const money = document.getElementById('money');
        money.innerHTML = `$${account.balance}`;

        const paginationParamas = new URLSearchParams();
        paginationParamas.append('offset',1);
        paginationParamas.append('size',2);

        const transfers = await TransferApi.GetTransfersByAccountId(account.accountId,paginationParamas);
        console.log(transfers);
        const table = document.getElementById('lastActivity-table');

        
        table.innerHTML = await activity(transfers);
        table.innerHTML += `<li class="view-all" onclick="window.location.href='./activity.html';">
                                <a>Ver toda la actividad</a>
                            </li>
                        `;

        // Busco User por Id en la API
        const user = await UserApi.GetUserById(userId);
        localStorage.setItem('userEmail', user.email);
        
        // actualizamos nombre
        const name = document.getElementById('wellcome');
        name.innerHTML = `¡Hola ${user.name}!`;

        //document.getElementById('allActivity').addEventListener('click', redirectPage);

    

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

