import React, { Component } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// backend server serves the data to the front end, which displays, anytime the data changes, state is updated and frontend refreshes
// To test, just make some json data up and serve to front end


//worldCoinIndexApi key : n6XX1FqVJcS4ezcqeXrptgBcwkObt6

const Row = props => (
  <TableRow>
    <TableCell>{props.crypto.name}</TableCell>
    <TableCell>{props.crypto.type}</TableCell>
    <TableCell>{props.crypto.last}</TableCell>
  </TableRow>
)


export default class Top10Table extends Component {
  constructor() {
    super()

    this.state = {
      data: {
        result: [{
          name: 'BTC-PERP',
          type: 'perpetual contract',
          last: 1000
        }]
      }
    }

    this.cryptoList = this.cryptoList.bind(this)

  }

  componentDidMount() {
    axios.get('http://localhost:3001/ticker')
      .then(res => {
        this.setState({ data: res.data })
      })
    this.startUpdate()
  }
  startUpdate() {
    setInterval(() => {
      axios.get('http://localhost:3001/ticker')
        .then(res => {
          this.setState({ data: res.data })
        })
        .catch(err => console.log(err))
    }, 500)
  }
  cryptoList() {
    return this.state.data.result.map(crypto => {
      return <Row crypto={crypto} key={crypto.name} />
    })
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cryto</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.cryptoList()}
        </TableBody>
      </Table>
    )
  }
}