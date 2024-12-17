import { UrlAccount } from "../constants.js";

const getAccountTypes = async () => {
    try {
        let result = [];
        let response = await fetch(`${UrlAccount}AccountType`, {
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
        console.error("Error al cargar los tipos de cuenta", error);
        return [];
    }
}

const accountTypeApi = {
    GetAccountTypes : getAccountTypes 
}
export default accountTypeApi;