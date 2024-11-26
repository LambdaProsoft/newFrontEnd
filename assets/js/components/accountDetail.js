export default async function accountDetail(accountData) {
    return `<li>
                <div>
                    <h2>Mi cuenta</h2>
                    <h3>Mi CBU</h3>
                    <p>${accountData.cbu}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Alias</h3>
                    <p>${accountData.alias}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Numero de cuenta</h3>
                    <p>${accountData.numeroDeCuenta}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Tipo de cuenta</h3>
                    <p>${accountData.tipoDeCuenta}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Tipo de moneda</h3>
                    <p>${accountData.tipoDeMoneda}</p>
                </div>
            </li>
            <li>
                <div>
                    <h3>Estado de la cuenta</h3>
                    <p>${accountData.estadoDeLaCuenta}</p>
                </div>
            </li>
    `;
}