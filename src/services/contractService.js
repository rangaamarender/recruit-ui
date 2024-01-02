import axios from "axios";
const baseUrl = "http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization";

export const contractsApi = async (currentPage,rows) =>{
return await axios.get(`${baseUrl}?offset=${currentPage}&limit=${rows}`);
}