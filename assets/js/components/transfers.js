import formatDate from "../components/formateDate.js";

export default async function activity(transferencesData) {
    return `<li>
                <h2>Mi Actividad</h2>
            </li>  
            ${ (await Promise.all(transferencesData.map(transfer => transfersData(transfer)))).join("") }
    `;
}
async function transfersData(transfer) {
    const imageMap = new Map([
        [1, "others.svg"],
        [2, "rent.svg"],
        [3, "cuota.svg"],
        [4, "receipt.svg"],
        [5, "ensurance.svg"],
        [6, "fee.svg"],
        [7, "loans.svg"],
    ]);
    console.log(transfer);
    return `
        <li onclick="localStorage.setItem('transferenceID','${transfer.id}'); window.location.href='./transferDetail.html';">
            <div class="activity-content">
                <div class="activity-img-detail">
                    <img src="assets/img/${imageMap.get(transfer.typeId)}"></img>
                    <div class="activity-detail-alias">
                        <p>${transfer.description}</p>
                        <p class="activity-alias">${transfer.destAccountAliasOrCBU}</p>
                    </div>
                </div>
                <div class="activity-amount-date">
                    <p>$${transfer.amount}</p>
                    <p class="activity-date">${await formatDate(transfer.date)}</p>
                </div>
            </div>
        </li>
    `;
}