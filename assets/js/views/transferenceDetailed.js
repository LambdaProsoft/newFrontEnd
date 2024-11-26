import sidebar from "../components/sidebar.js";
import transferenceDetail from "../components/transferenceDetail.js";
import TransferApi from "../services/transferApi.js";

async function transferenceInfo(id) {
    const section = document.getElementById("transfer-detail");
    let data = await TransferApi.GetTransferById(id);
    section.innerHTML = await transferenceDetail(data);
}

const render = async () => {
    const navbar = await document.getElementById("sidebar");
    navbar.innerHTML = await sidebar();
    await transferenceInfo(localStorage.getItem('transferenceID'));
}

window.onload = render;