import React, { Component } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Row = props => (
  <TableRow>
    <TableCell>{props.crypto.name}</TableCell>
    <TableCell>{props.crypto.type}</TableCell>
    <TableCell>{props.crypto.last}</TableCell>
    <TableCell>{props.crypto.quoteVolume24h}</TableCell>
  </TableRow>
)


export default class Top10Table extends Component {
  constructor() {
    super()

    this.state = {
      data: []
    }

    this.cryptoList = this.cryptoList.bind(this)

  }

  componentDidMount() {
    axios.get('http://localhost:3001/ticker')
      .then(res => {
        console.log(res.data)
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

    return this.state.data.map(crypto => {
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
            <TableCell>Volume 24hr</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.cryptoList()}
        </TableBody>
      </Table>
    )
  }
}