const axios = require('axios');
const md5 = require('md5');
const randomstring = require("randomstring");
const dayjs = require('dayjs')
const qs = require('qs');

const key = "48a35c83382b18bec084a42956185d27";
const betflix = "zIrbxCVs6FRpKjOW";
let urlApi = "https://api.bfx.fail";


exports.createUser = async (req, res, next) => {
    try {

        let url = `${urlApi}/v4/user/register`

        const { tel, password, contact } = req.body;
        const subTel = tel.substring(3, 10);
        const username = `${subTel}`;

        const data = {
            "username": `${username}`,
            "password": password,
            "tel": tel,
            "name": contact,
            "note": ""
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response);

        if (response.data.error_code === 0) {
            res.status(200).json({
                data: {
                    result: {
                        username: response.data.data.username,
                        _id: randomstring.generate(25),
                        group_id: randomstring.generate(25),
                    },
                },
            });
        } else if (response.data.error_code !== 0) {
            res.status(400).json({
                data: response.data,
            });
        }

    } catch (error) {
        console.log(error)
        next(error);
    }
};

exports.getCreditByID = async (req, res, next) => {
    try {

        let url = `${urlApi}/v4/user/balance`

        const username = req.params.username;

        const data = {
            "username": username
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response);

        if (response.data.error_code === 0) {
            res.status(200).json({
                current_credit: [
                    {
                        balance: response.data.data.balance,
                        message: response.data.msg,
                    },
                ],
            });
        } else if (response.data.error_code !== 0) {
            res.status(400).json({
                data: response.data,
            });
        }


    } catch (error) {
        next(error);
    }
};

exports.deposit = async (req, res, next) => {
    try {

        let url = `${urlApi}/v4/user/transfer`

        const { amount, username } = req.body;

        const ref = `bfxn_${username}_${randomstring.generate(15)}`;

        const data = {
            "username": username,
            "amount": parseFloat(amount),
            "ref": ref
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response);

        if (response.data.error_code === 0) {
            res.status(200).json({
                resp: {
                    code: 0,
                    message: response.data.msg,
                },
                result: [
                    {
                        beforeBalance: response.data.data.before_balance,
                        afterBalance: response.data.data.balance,
                        ref: ref,
                    },
                ],
            });
        } else if (response.data.error_code !== 0) {
            res.status(200).json({
                resp: {
                    code: 1,
                    status: response.data.status,
                    message: response.data.msg,
                },
            });
        }

    } catch (error) {
        next(error);
    }
};

exports.withdraw = async (req, res, next) => {
    try {

        let url = `${urlApi}/v4/user/transfer`

        const { amount, username } = req.body;

        const ref = `bfxn_${username}_${randomstring.generate(15)}`;

        const data = {
            "username": username,
            "amount": parseFloat(-amount),
            "ref": ref
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response);

        if (response.data.error_code === 0) {
            res.status(200).json({
                resp: {
                    code: 0,
                    message: response.data.msg,
                },
                result: [
                    {
                        beforeBalance: response.data.data.before_balance,
                        afterBalance: response.data.data.balance,
                        ref: ref,
                    },
                ],
            });
        } else if (response.data.error_code !== 0) {
            res.status(200).json({
                resp: {
                    code: 1,
                    status: response.data.status,
                    message: response.data.msg,
                },
            });
        }

    } catch (error) {
        next(error);
    }
};

exports.winLost = async (req, res, next) => {
    try {

        const { dateTimeFrom, dateTimeTo, username } = req.body;
        let validAmount = 0;

        const start = dayjs(dateTimeFrom).format('YYYY-MM-DD')
        const end = dayjs(dateTimeTo).format('YYYY-MM-DD')


        let url = `${urlApi}/v4/report/summaryNEW?username=${username}&start=${start}&end=${end}`

        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            url,
        };

        const response = await axios(options);

       console.log(response)


        res.status(200).json({
            data: {
                result: {
                    result: {
                        summary: {
                            validAmount:  response.data.data.valid_amount
                        },
                        data: response.data.data
                    }
                }
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {

        let url = `${urlApi}/v4/user/changePassword`

        const { username, newPassword } = req.body

        const data = {
            "username": username,
            "new_password": newPassword
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response);

        if (response.data.error_code === 0) {
            res.status(200).json({
                status: 0,
                statusCode: response.data.status,
                message: response.data.msg,
            });
        } else if (response.data.error_code !== 0) {
            res.status(200).json({
                status: 1,
                statusCode: response.data.status,
                message: response.data.msg,
            });
        }

    } catch (error) {
        next(error);
    }
}

exports.loginGameLobby = async (req, res, next) => {
    try {

        const username = req.params.username

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.login_token
        const linkUrl = `https://www.betflik.com/login/apilogin/${token}`

        res.status(200).json({
            url: linkUrl
        })

    } catch (error) {
        next(error);
    }
}




exports.loginGameLobbyWe = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "we"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyJoker = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "joker"
        const gamecode = "joker.txt"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyXg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "xg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyEg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "eg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyCq9 = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "cq9"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyR88 = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "r88"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyAmb = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "amb"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}


exports.loginGameLobbyGdg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "gdg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}


exports.loginGameLobbyGd88 = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "gd88"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyAg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "ag"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyBg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "bg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyPs = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "ps"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}


exports.loginGameLobbySp = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "sp"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyTtg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "ttg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbySa = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "sa"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}


exports.loginGameLobbyDg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "dg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}


exports.loginGameLobbySexy = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "sexy"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyWm = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "wm"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.loginGameLobbyPg = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = "pg"
        const gamecode = "none"
        const language = "thai"

        let url = `${urlApi}/v4/play/login`

        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };

        const response = await axios(options);

        console.log(response.data);

        const token = response.data.data.launch_url
        const linkUrl = `${token}`

        res.status(200).json({
            url: linkUrl
        })


    } catch (error) {
        next(error);
    }
}

exports.gamelist = async (req, res, next) => {
    try {

        const username = req.params.username
        const provider = req.params.provider
        const gamecode = req.params.code
        const language = "thai"
        let url = `${urlApi}/v4/play/login`
        const data = {
            "username": username,
            "provider": provider,
            "gamecode": gamecode,
            "language": language
        }
        console.log(provider)
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-api-betflix": betflix, "x-api-key": key },
            data: qs.stringify(data),
            url,
        };
        const response = await axios(options);
        console.log(response.data);
        const token = response.data.data.launch_url
        const linkUrl = `${token}`
        res.status(200).json({
            url: linkUrl
        })
    } catch (error) {
        next(error);
    }
}
