const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors());
app.use(express.json());

const ticker = require('./routes/ticker')

app.use('/ticker', ticker)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))