import React,{useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const [values, setValues] = useState({  
    loading: false,
    orderAmount: "--",
    date: "--"
  });
  const {loading,orderAmount,date} = values;
  if(loading === false){
    axios.get("http://localhost:5000/api/blocks").then(res => {
    axios.get("http://localhost:5000/api/blockIndex/"+(res.data.length-1)).then(result => {
      //console.log(result.data)
      setValues({ ...values,loading:true, orderAmount:result.data.data.orderAmount, date:result.data.data.date});
    })
  })}
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Typography component="p" variant="h4">
        ₹{orderAmount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date}
      </Typography>
    </React.Fragment>
  );
}
