const express = require('express')
const router = express.Router()
const FTXrest = require('ftx-api-rest')
const pair = 'BTC-PERP'

const ftx = new FTXrest({
})

router.get('/', (req, res) => {
  ftx.request({
    method: 'GET',
    path: '/markets'
  }).then(acc => { res.json(acc) })
    .catch(err => console.log(err))
})

module.exports = router
