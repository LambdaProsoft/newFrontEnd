const getTransferTypes = async () => {
    try {
        let result = [];
            let response = await fetch('https://localhost:7045/api/TransferType', {
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
const TransferTypeApi = {
    GetTransferTypes : getTransferTypes
}
export default TransferTypeApi;

