import formatDate from "../components/formateDate.js";

export default async function transferenceDetail(transferData) {
    return `<li>
                <div class="transferDetail-img">
                    <img src="./assets/img/others.svg" class="">
                    <h3 class="transferDetail-title">Transferencia</h3>
                </div>
            </li>
            <li>
                <div>
                    <p class="transferDetail-amount">$${transferData.amount}</p>
                    <h3>Descripción</h3>
                    <p>${transferData.description}</p>
                </div>
            </li>
            
            <li>
                <div>
                    <h3>Destino</h3>
                    <p>Alias: ${transferData.destAccountAliasOrCBU}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Fecha</h3>
                    <p>${formatDate(transferData.date)}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Estado</h3>
                    <p>${transferData.status.status}</p>
                </div>
            </li>
    `;
}