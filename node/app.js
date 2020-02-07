const express = require('express')
const router = require('./router')

const app = express()

app.use('/', router)

app.get('/', (req, res) => {
  res.send('hello node')
})

const server = app.listen(5000, () => {
  console.log('HTTP启动成功: http://127.0.0.1:5000')
})