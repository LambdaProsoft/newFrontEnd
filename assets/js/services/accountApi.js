import { UrlAccount } from "../constants.js";

const getAccountByUserId = async (userId) => {
    try {
        let result = [];
        let response = await fetch(`${UrlAccount}Account/User/${userId}`, {
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
        console.error("Hubo un problema al obtener la cuenta:", error);
    }
}

const getAccountById = async (accountId) => {

    try {
        let result = [];
        let response = await fetch(`https://localhost:7214/api/Account/${accountId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if(response.ok){
            result = await response.json();
        }
        console.log(result)
        return result;

    } catch (error) {
        console.error("Hubo un problema al obtener la cuenta:", error);
    }
}
const getAccountByAliasOrCBU = async (searchParam) => {

    try {
        //let result = [];
        let response = await fetch(`https://localhost:7214/api/Account/${searchParam}/Alias`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        
        //if(response.ok){
        //    result = await response.json();
        //}
        //return result;
        return response;

    } catch (error) {
        console.error("Hubo un problema al obtener la cuenta:", error);
    }
}

const AccountApi = {
    GetAccountByUserId : getAccountByUserId,
    GetAccountByAliasOrCBU : getAccountByAliasOrCBU,
    GetAccountById : getAccountById,
}
export default AccountApi;
