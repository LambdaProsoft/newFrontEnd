import sidebar from "../components/sidebar.js";
import accountDetail from "../components/accountDetail.js";
import AccountApi from "../services/accountApi.js";

async function accountInfo() {
    const section = document.getElementById("transfer-detail");
    
    let data = await AccountApi.GetAccountById(localStorage.getItem('accountId'));
    console.log(data);
    section.innerHTML = await accountDetail(data);
}

const render = async () => {
    const navbar = await document.getElementById("sidebar");
    navbar.innerHTML = await sidebar();

    await accountInfo(localStorage.getItem('accountID'));
}

window.onload = render;