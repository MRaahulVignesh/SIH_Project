import React,{useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';

// Generate Order Data
function createData(id, date, seller, crop, loc, buy, quantity, paymentMethod, amount) {
  return { id, date, seller, crop, loc, buy, quantity, paymentMethod, amount };
}

var rows = []
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function Orders() {
  const [values, setValues] = useState({  
    loading: false
  });
  const [rows, setRows] = useState([]);
  const {loading} = values;
  useEffect(() => {
    console.log('trigger use effect hook');
    axios.get("http://localhost:5000/api/blocks").then(res => {
    console.log(res.data.length)
    var size = res.data.length;
    for(var i=1;i<size;i++){
        console.log(res.data[i].data)
        setRows(rows => [...rows,{id:res.data[i].index,date:res.data[i].data.date,seller:res.data[i].data.seller,crop:res.data[i].data.cropName,loc:res.data[i].data.location,buy:res.data[i].data.buyer,quantity:res.data[i].data.quantity,paymentMethod:res.data[i].data.paymentMethod,amount:res.data[i].data.orderAmount
          }])
    }
    setValues({...values,loading:true})
    })
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Crop</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Order Amount</TableCell>
          </TableRow>
        </TableHead>
        {loading?<TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.seller}</TableCell>
              <TableCell>{row.crop}</TableCell>
              <TableCell>{row.loc}</TableCell>
              <TableCell>{row.buy}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>:<TableBody></TableBody>}
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" target="_blank" href="/govttransaction">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}