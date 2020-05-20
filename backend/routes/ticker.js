const express = require('express')
const router = express.Router()
const FTXrest = require('ftx-api-rest')
const pair = 'BTC-PERP'

const ftx = new FTXrest({
  key: '1',
  secret: '1'
})

router.get('/', (req, res) => {
  ftx.request({
    method: 'GET',
    path: '/markets'
  }).then(market => {
    //get Perp contracts out
    //let regex = new RegExp('/PERP/gm')
    let newArr = market.result.filter(({ name }) => name.includes('PERP'))
    // const fitered = market.result.filter((name) => {
    //   return name.name.test(regex);
    // });
    //Sort by 24hr volume
    newArr.sort((a, b) => a.quoteVolume24h < b.quoteVolume24h ? 1 : -1)

    let top10 = newArr.slice(0, 9)
    res.json(top10)
  })
    .catch(err => console.log(err))
})

module.exports = router
