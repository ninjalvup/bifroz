const axios = require('axios');

class TBS {
    constructor(url) {
        this.url = url;
    }
    request(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.url, data)
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    verify(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.url, data)
            .then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    }
}

const config = (url) => {
    return new TBS(url)
}

module.exports = config