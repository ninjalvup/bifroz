require('dotenv').config()
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const tbs  = require('../services/tbsService.js')
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.enable('trust proxy')
app.disable('x-powered-by')


app.post('/api/tbs/getotp', async (req, res) => {
  console.log("/api/tbs/getotp:",req.body);
  var params = {
    key: req.body.key,
    secret: req.body.secret,
    msisdn: req.body.tel
  }

  try{
    const callTBS = tbs(process.env.TBS_REQUEST_OTP)
    const result = await callTBS.request(params)
    console.log("result getotp:",result);
    res.send(result);
  }catch (error){
    res.send(error);
  }
  
})


app.post('/api/tbs/verifyotp', async (req, res) => {
  console.log("/api/tbs/verifyotp:",req.body);
  var params = {
    key: req.body.key,
    secret: req.body.secret,
    token: req.body.token,
    pin: req.body.pin
    }
  try{
    const callTBS = tbs(process.env.TBS_VERIFY_OTP)
    const result = await callTBS.verify(params)
    console.log("result verifyotp:",result);
    res.send(result);
  }catch (error){
    res.send(error);
  }

})

module.exports = { app }