const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/new', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/:routeKey', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/:routeKey/delete', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})