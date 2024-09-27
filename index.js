const express = require('express')
const app = express()
const port = 3000
const Auth0TokenVerify = require("./auth0TokenVerify")


app.get('/',Auth0TokenVerify, (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})