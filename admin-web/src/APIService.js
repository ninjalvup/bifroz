import axios from 'axios';
const baseUrl = 'http://128.199.94.1:6001/api/user';

export class APIService{

    constructor(){
    }
    createContact(){

        const url = `${baseUrl}/login`;
        return axios.post(url);
    }
}