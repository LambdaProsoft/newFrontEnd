import sidebar from "../components/sidebar.js";
import { transferAlert } from "../components/transferAlert.js";
import TransferApi from "../services/transferApi.js";
import TransferTypeApi from "../services/transferenceTypeAPI.js";
import AccountApi from "../services/accountApi.js";

const alertSection = document.getElementById("customAlert");
const accountId = localStorage.getItem('accountId');
    if (!accountId) {
        alert('Por favor, vuelve a iniciar sesión');
        window.location.href = './login.html';
    }
    
async function step1(){
    let accountAlias = document.getElementById('alias').value.trim();
    const response = await AccountApi.GetAccountByAliasOrCBU(accountAlias);
    if(!response.ok){
        alertSection.innerHTML = await transferAlert("error","That Account does not exist");
        alertSection.style.display = 'flex';
    }else{
    document.getElementById(`step1`).style.display = 'none';
    document.getElementById(`step2`).style.display = 'block';
    }
}
window.step1 = step1;

async function step2(){
    const monto = document.getElementById('monto').value.trim();

    if(!monto || monto=='' || monto<=0){
        alertSection.innerHTML = await transferAlert("error","Ingrese un monto valido");
        alertSection.style.display = 'flex';
    }else{
    document.getElementById(`step2`).style.display = 'none';
    document.getElementById(`step3`).style.display = 'block';
    }
}
window.step2 = step2;

async function step3() {
    const description = document.getElementById('description').value.trim();
    const type = document.getElementById('types').value.trim();

    if(!description || description==''){
        alertSection.innerHTML = await transferAlert("error","Ingrese una descripcion");
        alertSection.style.display = 'flex';
    }
    else if(type==null || type==0){
        alertSection.innerHTML = await transferAlert("error","Seleccione un tipo de transferencia");
        alertSection.style.display = 'flex';
    }else{
    transfer();
    }
}
window.step3 = step3;


async function transfer() {
    const transferRequest = {
        amount: document.getElementById('monto').value.trim(),
        description: document.getElementById('description').value.trim(),
        typeId: parseInt(document.getElementById('types').value),
        srcAccountId: accountId,
        destAccountAliasOrCBU: document.getElementById('alias').value.trim(),
    };
    const response = await TransferApi.CreateTransfer(transferRequest);
    const result = await response.json();
    
    console.log(result.message);
    console.log(response);
    if(response.status == 400 || response.status == 404){
        alertSection.innerHTML = await transferAlert("error",result.message);
        alertSection.style.display = 'flex';            
    }else if(response.status == 500){
        alertSection.innerHTML = await transferAlert("error","Ocurrio un error, por favor intente nueva mente");
        alertSection.style.display = 'flex';
    }
    else if(response.status == 201){
        alertSection.innerHTML = await transferAlert("succes","Transferencia completada");
        alertSection.style.display = 'flex';
        const form = document.getElementById('transferForm');
        form.reset();
    }
    document.getElementById(`step1`).style.display = 'block';
    document.getElementById(`step3`).style.display = 'none';
}

async function closeAlert() {
    const alertBox = document.getElementById("customAlert");
    alertBox.style.display = "none";
}
window.closeAlert = closeAlert;

async function render() {
    let navbar = document.getElementById("sidebar");
    navbar.innerHTML = await sidebar();
    document.getElementById(`step1`).style.display = 'block';
    const select = document.getElementById(`types`);
    select.innerHTML = '<option value="0">Selecciona un tipo</option>';
    const types = await TransferTypeApi.GetTransferTypes();

    types.forEach(transferType => {
        const option = document.createElement('option');
        option.value = transferType.transferTypeId;
        option.textContent = transferType.name;
        select.appendChild(option);
    });
}
window.onload = render;


