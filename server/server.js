const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const db = require('./config/connection')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(routes)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`))
})