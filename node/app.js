const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

app.get('/', (req, res) => {
  res.send('hello node')
})

const server = app.listen(5000, () => {
  console.log('HTTP启动成功: http://127.0.0.1:5000')
})