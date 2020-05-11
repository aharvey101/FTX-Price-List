import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

//Madeup Data
function createData(id, crypto, price) {
  return { id, crypto, price }
}

const rows = [
  createData(0, 'BTC', 10000),
  createData(0, 'ETH', 300),
  createData(0, 'XRP', 1),
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Top10Table() {
  return (
    <React.Fragment>
      <Title> The Top 10</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cryto</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.crypto}</TableCell>
              <TableCell>{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}