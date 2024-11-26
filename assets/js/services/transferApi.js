const getTransferByAccountId = async (accountId,paginationParamas) => {
    try {
        let result = [];
            let response = await fetch(`https://localhost:7045/api/Transfer/${accountId}/Accounts?${paginationParamas}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            });       
            if(response.ok){
                result = await response.json();
            }
        return result;
    } catch (error) {
        console.error("Hubo un problema al obtener las transferencias:", error);
    }
}
const getTransferById = async (transferId) => {
    try {
        let result = [];
            let response = await fetch(`https://localhost:7045/api/Transfer?transferId=${transferId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            });    
            if(response.ok){
                result = await response.json();
            }
        return result;
    } catch (error) {
        console.error("Hubo un problema al obtener las transferencias:", error);
    }
}

const createTransfer = async (transferRequest) =>{
    try {
        const response = await fetch('https://localhost:7045/api/Transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transferRequest)
        });
        console.log(response);
        return response;  
    } catch (error) {
        console.error("Hubo un problema al obtener la cuenta:", error);
    }
}

const TransferApi = {
    GetTransfersByAccountId : getTransferByAccountId,
    CreateTransfer : createTransfer,
    GetTransferById : getTransferById,
}
export default TransferApi;